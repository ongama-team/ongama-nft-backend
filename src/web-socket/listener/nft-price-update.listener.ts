import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ethers, BigNumber } from 'ethers';
import { Event } from '@ethersproject/contracts';

import { NftsService } from '../../modules/nfts/nfts.service';
import { logger } from '../../utils/logger';
import { Web3Helper } from '../../utils/web3Helper';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export default class NftPriceUpdateListener {
  constructor(private readonly nftService: NftsService, private readonly userService: UsersService) {}

  listen(listener) {
    listener.on(
      listener.filters.PriceUpdate(),
      async (owner: string, oldPrice: BigNumber, newPrice: BigNumber, nftID: BigNumber, event: Event) => {
        logger.info(
          `Received event for NFT price modification - ${nftID}, to address - ${owner}, event - ${JSON.stringify(
            event,
          )}`,
        );

        const tokenID = Number(nftID);
        const nft = await this.nftService.findByTokenID(tokenID);

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

        if (nft.tokenID !== tokenID) {
          logger.warn('TokenID mismatch different from on-chain tokenID', {
            onChainTokenID: tokenID,
            nftIDUpdateTokenID: nft.tokenID,
          });
          return false;
        }
        const nftOldPrice = Number(ethers.utils.formatEther(oldPrice));

        if (nft.price !== nftOldPrice) {
          logger.warn('NFT Price mismatch different from on-chain tokenID', {
            onChainPrice: nftOldPrice,
            nftIDUpdateTokenPrice: nft.price,
          });
          return false;
        }

        await this.nftService.updateToken(nft.id, {
          price: Number(ethers.utils.formatEther(newPrice)),
        });
      },
    );
  }
}
