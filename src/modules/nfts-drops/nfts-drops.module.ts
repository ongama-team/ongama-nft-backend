import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftsDropsService } from './nfts-drops.service';
import { NftsDropsRepository } from './nfts-drops.repository';
import { NftsDropsController } from './nfts-drops.controller';
import { NftsService } from '../nfts/nfts.service';
import { Nft } from '../nfts/nfts.entity';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([NftsDropsRepository, Nft, UsersRepository])],
  providers: [NftsDropsService, NftsService, UsersService],
  controllers: [NftsDropsController],
})
export class NftsDropsModule {}
