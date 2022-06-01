import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { UsersService } from '../users/users.service';
import { NftsDropsService } from '../nfts-drops/nfts-drops.service';
import { UsersModule } from '../users/users.module';
import { NftsDropsModule } from '../nfts-drops/nfts-drops.module';
import { NftRepository } from './nfts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NftRepository]), UsersModule, forwardRef(() => NftsDropsModule)],
  providers: [NftsService, UsersService, NftsDropsService],
  exports: [TypeOrmModule, NftsService],
  controllers: [NftsController],
})
export class NftsModule {}
