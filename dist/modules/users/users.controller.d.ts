import { NftsService } from '../nfts/nfts.service';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    private readonly nftService;
    constructor(userService: UsersService, nftService: NftsService);
    getOne(addressOrUsername: string): Promise<{
        user: import("./users.entity").User;
    }>;
}
