import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';

import { NftsService } from '../../modules/nfts/nfts.service';
import { logger } from '../../utils/logger';
import { Web3Helper } from '../../utils/web3Helper';

@Injectable()
export default class NftListingUpdateListener {
  constructor(private readonly nftService: NftsService) {}

  listen(listener) {
    listener.on(
      listener.filters.NftListStatus(),
      async (owner: string, nftID: BigNumber, isListed: boolean, event: Event) => {
        logger.info(
          `Received event for NFT of ID ${nftID} update listing from address ${owner} to status ${isListed}, event - ${JSON.stringify(
            event,
          )}`,
        );

        const nft = await this.nftService.findByTokenID(Number(nftID));

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
          throw new BadRequestException(
            'FAILED_VALIDATING_UPDATE_LISTING: Update Listing request could not be validated',
          );
        }
        if (!transactionReceipt.blockHash || !transactionReceipt.blockNumber || !transactionReceipt.status) {
          logger.warn('Transaction failed or might still be pending', {
            blockHash: transactionReceipt.blockHash,
            blockNumber: transactionReceipt.blockNumber,
            status: transactionReceipt.status,
          });
          throw new BadRequestException(
            'FAILED_VALIDATING_UPDATE_LISTING: Update Listing request could not be validated',
          );
        }

        await this.nftService.updateToken(nft.id, {
          listed: false,
          listedOnchain: false,
        });
      },
    );
  }
}
