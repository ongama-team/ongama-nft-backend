import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '@ethersproject/contracts';

import { NftsService } from '../../modules/nfts/nfts.service';
import { logger } from '../../utils/logger';
import { Web3Helper } from '../../utils/web3Helper';
import { UsersService } from '../../modules/users/users.service';
import { isValidAddress } from '../../utils/Utils';

@Injectable()
export default class NftTransferListener {
  constructor(private readonly nftService: NftsService, private readonly userService: UsersService) {}

  listen(listener) {
    listener.on(listener.filters.Transfer(), async (from: string, to: string, tokenID: number, event: Event) => {
      logger.info(
        `Received event for NFT of ID ${tokenID} transfer from address ${from} to address ${to}, event - ${JSON.stringify(
          event,
        )}`,
      );

      // -- Load the NFT
      const nft = await this.nftService.findByTokenID(tokenID);

      if (!nft) {
        throw new NotFoundException('NFT not found');
      }

      // -- Check the transaction hash
      const { mintContractAddress, web3 } = Web3Helper.getWeb3();
      const transactionReceipt = await web3.eth.getTransactionReceipt(event.transactionHash.toLowerCase());

      if (mintContractAddress.toLowerCase() !== transactionReceipt.to.toLowerCase()) {
        logger.warn('Sent to the wrong contract address', {
          to: transactionReceipt.to,
          from: transactionReceipt.from,
        });
        throw new BadRequestException('FAILED_VALIDATING_TRANSFER: Mint request could not be validated');
      }
      if (!transactionReceipt.blockHash || !transactionReceipt.blockNumber || !transactionReceipt.status) {
        logger.warn('Transaction failed or might still be pending', {
          blockHash: transactionReceipt.blockHash,
          blockNumber: transactionReceipt.blockNumber,
          status: transactionReceipt.status,
        });
        throw new BadRequestException('FAILED_VALIDATING_TRANSFER: Transfer request could not be validated');
      }

      // -- Check the receiver
      let receiverUser = await this.userService.findByAddress(to);
      if (!receiverUser) {
        if (!isValidAddress(to)) {
          throw new BadRequestException('INVALID_RECEIVER_ADDRESS: Failed validating the receiving address');
        }

        // We create the user
        receiverUser = await this.userService.saveNewUser({
          walletAddress: to,
        });
      }

      // -- Update the NFT's new owner. & Set listed = false
      nft.owner = receiverUser;
      nft.ownerId = receiverUser.id;
      nft.ownerAddress = receiverUser.walletAddress;
      nft.ownerUsername = receiverUser.username;
      nft.listed = false;
      nft.listedOnChain = false;

      await Promise.all([
        await this.nftService.updateToken(nft.id, nft),
        await this.userService.increment({ id: nft.ownerId, column: 'nftsCount' }),
      ]);
    });
  }
}