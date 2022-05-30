import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { Nft } from './nfts.entity';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { NftsDropsService } from '../nfts-drops/nfts-drops.service';
import { NftsDropsRepository } from '../nfts-drops/nfts-drops.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Nft, UsersRepository, NftsDropsRepository])],
  providers: [NftsService, UsersService, NftsDropsService],
  controllers: [NftsController],
})
export class NftsModule {}
