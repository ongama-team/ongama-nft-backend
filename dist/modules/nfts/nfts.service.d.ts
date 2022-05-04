import { Repository, UpdateResult } from 'typeorm';
import { Nft } from './nfts.entity';
import { UsersRepository } from '../users/users.repository';
import { CreateNFTDto } from './nfts.dto';
import { UsersService } from '../users/users.service';
export declare class NftsService {
    private nftsRepository;
    readonly userRepository: UsersRepository;
    readonly userService: UsersService;
    constructor(nftsRepository: Repository<Nft>, userRepository: UsersRepository, userService: UsersService);
    save(data: CreateNFTDto): Promise<Nft>;
    findByTokenUri(tokenUri: string): Promise<Nft>;
    updateToken(id: number, data: Partial<Nft>): Promise<UpdateResult>;
}
