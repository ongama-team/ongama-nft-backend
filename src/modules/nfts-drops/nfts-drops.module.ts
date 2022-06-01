import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftsDropsService } from './nfts-drops.service';
import { NftsDropsRepository } from './nfts-drops.repository';
import { NftsDropsController } from './nfts-drops.controller';
import { NftsService } from '../nfts/nfts.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { NftsModule } from '../nfts/nfts.module';

@Module({
  imports: [TypeOrmModule.forFeature([NftsDropsRepository]), UsersModule, forwardRef(() => NftsModule)],
  providers: [NftsDropsService, NftsService, UsersService],
  exports: [TypeOrmModule, NftsDropsService],
  controllers: [NftsDropsController],
})
export class NftsDropsModule {}
