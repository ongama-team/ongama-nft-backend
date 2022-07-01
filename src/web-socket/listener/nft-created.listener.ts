import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '@ethersproject/contracts';
import { ethers, BigNumber } from 'ethers';

import { NftsService } from '../../modules/nfts/nfts.service';
import { logger } from '../../utils/logger';
import { Web3Helper } from '../../utils/web3Helper';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export default class NftCreatedListener {
  constructor(private readonly nftService: NftsService, private readonly userService: UsersService) {}

  listen(listener) {
    listener.on(
      listener.filters.Minted(),
      async (minter: string, price: BigNumber, nftID: BigNumber, uri: string, event: Event) => {
        logger.info(
          `Received event for NFT creation for nft - ${nftID}, to address - ${minter}, event - ${JSON.stringify(
            event,
          )}`,
        );

        const nft = await this.nftService.findByTokenUri(uri);

        if (!nft) {
          throw new NotFoundException('NFT not found');
        }

        const { mintContractAddress } = Web3Helper.getWeb3();
        const transactionReceipt = await event.getTransactionReceipt();

        if (mintContractAddress.toLowerCase() !== transactionReceipt.to.toLowerCase()) {
          logger.warn('Sent to the wrong contract address', {
            to: transactionReceipt.to,
            from: transactionReceipt.from,
          });
          throw new BadRequestException('FAILED_VALIDATING_MINT: Mint request could not be validated');
        }

        if (!transactionReceipt.blockHash || !transactionReceipt.blockNumber || !transactionReceipt.status) {
          logger.warn('Transaction failed or might still be pending', {
            blockHash: transactionReceipt.blockHash,
            blockNumber: transactionReceipt.blockNumber,
            status: transactionReceipt.status,
          });
          throw new BadRequestException('FAILED_VALIDATING_MINT: Mint request could not be validated');
        }

        await Promise.all([
          await this.nftService.updateToken(nft.id, {
            tokenUri: uri,
            mintTransactionHash: event.transactionHash.toLowerCase(),
            tokenID: Number(nftID),
            price: Number(ethers.utils.formatEther(price)),
          }),
          await this.userService.increment({ id: nft.creatorId, column: 'nftsCount' }),
        ]);
      },
    );
  }
}
