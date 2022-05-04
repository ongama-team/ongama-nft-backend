import { NftsService } from './nfts.service';
import { CreateNFTDto } from './nfts.dto';
import { UsersService } from '../users/users.service';
export declare class NftsController {
    private readonly nftService;
    readonly userService: UsersService;
    constructor(nftService: NftsService, userService: UsersService);
    createNft(nftData: CreateNFTDto, req: any): Promise<{
        message: any;
        nft: import("./nfts.entity").Nft;
    }>;
}
