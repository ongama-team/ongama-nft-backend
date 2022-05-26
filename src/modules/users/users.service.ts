import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { NftRepository } from '../nfts/nfts.repository';

@Injectable()
export class UsersService {
  constructor(public readonly userRepository: UsersRepository, public readonly nftRepository: NftRepository) {}

  saveNewUser(data: Partial<User>): Promise<User> {
    return this.userRepository.save({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByAddress(walletAddress: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        walletAddress,
      },
    });
  }

  updateById(id: number, data: Partial<User>): Promise<UpdateResult> {
    return this.userRepository.update(id, data);
  }

  increment({ id, column, by = 1 }: { id: number; column: keyof User; by?: number }): Promise<UpdateResult> {
    return this.userRepository.increment({ id }, column, by);
  }

  decrement({ id, column, by = 1 }: { id: number; column: keyof User; by?: number }): Promise<UpdateResult> {
    return this.userRepository.decrement({ id }, column, by);
  }
}
