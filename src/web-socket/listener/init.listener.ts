import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

import NftCreatedListener from './nft-created.listener';
import NFTContractABI from '../../abi/NFT.json';
import NftTransferListener from './nft-transfer.listener';
import NftPriceUpdateListener from './nft-price-update.listener';

@Injectable()
export default class InitListener {
  private readonly logger = new Logger(this.constructor.name);
  private listener;
  private mintContractAddress = null;

  constructor(
    private nftCreatedListener: NftCreatedListener,
    private nftTransferListener: NftTransferListener,
    private nftPriceUpdateListener: NftPriceUpdateListener,
    private configService: ConfigService,
  ) {
    this.mintContractAddress = this.configService.get<number>('MINT_CONTRACT_ADDRESS');
  }

  listen(provider) {
    this.initListener(provider);
    this.nftCreatedListener.listen(this.listener);
    this.nftTransferListener.listen(this.listener);
    this.nftPriceUpdateListener.listen(this.listener);
  }

  private initListener(provider) {
    Logger.log(`Initializing listener - ${this.mintContractAddress}`);
    this.listener = new ethers.Contract(this.mintContractAddress, NFTContractABI.abi, provider);
  }
}
