import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { NftsService } from '../nfts/nfts.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { Nft } from '../nfts/nfts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, Nft])],
  providers: [UsersService, NftsService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
