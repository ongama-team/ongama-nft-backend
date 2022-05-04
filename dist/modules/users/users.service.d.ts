import 'dotenv/config';
import { UpdateResult } from 'typeorm';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { NftRepository } from '../nfts/nfts.repository';
export declare class UsersService {
    readonly userRepository: UsersRepository;
    readonly nftRepository: NftRepository;
    constructor(userRepository: UsersRepository, nftRepository: NftRepository);
    saveNewUser(data: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByAddress(walletAddress: string): Promise<User>;
    updateById(id: number, data: Partial<User>): Promise<UpdateResult>;
    increment({ id, column, by }: {
        id: number;
        column: keyof User;
        by?: number;
    }): Promise<UpdateResult>;
    decrement({ id, column, by }: {
        id: number;
        column: keyof User;
        by?: number;
    }): Promise<UpdateResult>;
}
