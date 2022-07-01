import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BigNumber } from '@ethersproject/bignumber';
import { Event } from '@ethersproject/contracts';

import { NftsService } from '../../modules/nfts/nfts.service';
import { logger } from '../../utils/logger';
import { Web3Helper } from '../../utils/web3Helper';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export default class NftSaleListener {
  constructor(private readonly nftService: NftsService, private readonly userService: UsersService) {}

  listen(listener) {
    listener.on(
      listener.filters.Purchase(),
      async (seller: string, buyer: string, price: BigNumber, nftID: number, uri: string, event: Event) => {
        logger.info(
          `Received event for NFT sale for nft - ${nftID}, from buyer - ${buyer} to owner - ${seller}, event - ${JSON.stringify(
            event,
          )}`,
        );

        const nft = await this.nftService.findByTokenUri(uri);

        if (!nft) {
          throw new NotFoundException('NFT not found');
        }

        const { mintContractAddress, web3 } = Web3Helper.getWeb3();
        const transactionReceipt = await event.getTransactionReceipt();

        if (mintContractAddress.toLowerCase() !== transactionReceipt.to.toLowerCase()) {
          logger.warn('Sent to the wrong contract address', {
            to: transactionReceipt.to,
            from: transactionReceipt.from,
          });
          throw new BadRequestException('FAILED_VALIDATING_SALE: Sale request could not be validated');
        }

        if (!transactionReceipt.blockHash || !transactionReceipt.blockNumber || !transactionReceipt.status) {
          logger.warn('Transaction failed or might still be pending', {
            blockHash: transactionReceipt.blockHash,
            blockNumber: transactionReceipt.blockNumber,
            status: transactionReceipt.status,
          });
          throw new BadRequestException('FAILED_VALIDATING_SALE: Sale request could not be validated');
        }

        if (nft.tokenID !== nftID) {
          logger.warn('TokenID mismatch different from on-chain tokenID', {
            onChainTokenID: nftID,
            nftIDUpdateTokenID: nft.tokenID,
          });
          throw new BadRequestException('FAILED_VALIDATING_SALE: Sale request could not be validated');
        }

        const onChainPrice = web3.utils.fromWei(price.toString(), 'ether');

        if (nft.price.toString() !== onChainPrice) {
          logger.warn('NFT Price mismatch different from on-chain tokenID', {
            onChainPrice,
            nftIDUpdateTokenPrice: nft.price,
          });
          return false;
        }

        let buyerUser = await this.userService.findByAddress(Web3Helper.getAddressChecksum(buyer));

        if (!buyerUser) {
          buyerUser = await this.userService.saveNewUser({
            walletAddress: Web3Helper.getAddressChecksum(buyer),
          });
        }

        const sellerUser = await this.userService.findByAddress(
          Web3Helper.getAddressChecksum(seller || nft.ownerAddress),
        );

        await Promise.all([
          await this.nftService.updateToken(nft.id, {
            ownerId: buyerUser.id,
            ownerAddress: buyerUser.walletAddress || buyer,
            listed: false,
          }),

          await this.userService.updateById(sellerUser.id, {
            nftsOwnCount: sellerUser.nftsOwnCount - 1,
            salesTotalAmount: sellerUser.salesTotalAmount + nft.price,
            salesCount: sellerUser.salesCount + 1,
          }),

          await this.userService.updateById(buyerUser.id, {
            nftsOwnCount: buyerUser.nftsOwnCount + 1,
            buysTotalAmount: buyerUser.buysTotalAmount + nft.price,
            buysCount: buyerUser.buysCount + 1,
          }),
        ]);
      },
    );
  }
}
