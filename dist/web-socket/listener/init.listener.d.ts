import { ConfigService } from '@nestjs/config';
import NftCreatedListener from './nft-created.listener';
export default class InitListener {
    private nftCreatedListener;
    private configService;
    private readonly logger;
    private listener;
    private mintContractAddress;
    constructor(nftCreatedListener: NftCreatedListener, configService: ConfigService);
    listen(provider: any): void;
    private initListener;
}
