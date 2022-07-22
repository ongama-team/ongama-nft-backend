import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';

import { NftsService } from '../../modules/nfts/nfts.service';
import { logger } from '../../utils/logger';
import { Web3Helper } from '../../utils/web3Helper';
import { UsersService } from '../../modules/users/users.service';
import { isValidAddress } from '../../utils/Utils';
import { ZERO_ADDRESS } from '../../constants/shared';

@Injectable()
export default class NftTransferListener {
  constructor(private readonly nftService: NftsService, private readonly userService: UsersService) {}

  listen(listener) {
    listener.on(listener.filters.Transfer(), async (from: string, to: string, tokenID: BigNumber, event: Event) => {
      logger.info(
        `Received event for NFT of ID ${tokenID} transfer from address ${from} to address ${to}, event - ${JSON.stringify(
          event,
        )}`,
      );

      if (from === ZERO_ADDRESS) {
        return false;
      }

      // -- Load the NFT
      const nft = await this.nftService.findByTokenID(Number(tokenID));

      if (!nft) {
        throw new NotFoundException('NFT not found');
      }

      // -- Check the transaction hash
      const { mintContractAddress } = Web3Helper.getWeb3();
      const transactionReceipt = await event.getTransactionReceipt();

      if (mintContractAddress.toLowerCase() !== transactionReceipt.to.toLowerCase()) {
        logger.warn('Sent to the wrong contract address', {
          to: transactionReceipt.to,
          from: transactionReceipt.from,
        });
        throw new BadRequestException('FAILED_VALIDATING_TRANSFER: Transfer request could not be validated');
      }
      if (!transactionReceipt.blockHash || !transactionReceipt.blockNumber || !transactionReceipt.status) {
        logger.warn('Transaction failed or might still be pending', {
          blockHash: transactionReceipt.blockHash,
          blockNumber: transactionReceipt.blockNumber,
          status: transactionReceipt.status,
        });
        throw new BadRequestException('FAILED_VALIDATING_TRANSFER: Transfer request could not be validated');
      }

      let receiverUser = await this.userService.findByAddress(to);
      if (!receiverUser) {
        if (!isValidAddress(to)) {
          throw new BadRequestException('INVALID_RECEIVER_ADDRESS: Failed validating the receiving address');
        }

        receiverUser = await this.userService.saveNewUser({
          walletAddress: Web3Helper.getAddressChecksum(to),
        });
      }

      await Promise.all([
        await this.nftService.updateToken(nft.id, {
          ownerId: receiverUser.id,
          ownerAddress: receiverUser.walletAddress,
          listed: false,
          listedOnchain: false,
        }),
        await this.userService.decrement({ id: nft.ownerId, column: 'nftsOwnCount' }),
        await this.userService.increment({ id: receiverUser.id, column: 'nftsOwnCount' }),
      ]);
    });
  }
}
