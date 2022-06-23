import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { NftRepository } from '../nfts/nfts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, NftRepository])],
  providers: [UsersService, NftsService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
