import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { Nft } from './nfts.entity';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nft])],
  providers: [NftsService, UsersRepository, UsersService],
  controllers: [NftsController],
})
export class NftsModule {}
