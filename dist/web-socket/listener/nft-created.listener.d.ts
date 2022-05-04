import { NftsService } from '../../modules/nfts/nfts.service';
import { UsersService } from '../../modules/users/users.service';
export default class NftCreatedListener {
    private readonly nftService;
    private readonly userService;
    constructor(nftService: NftsService, userService: UsersService);
    listen(listener: any): void;
}
