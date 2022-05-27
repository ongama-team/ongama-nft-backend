import { Controller, Post, Body, Req, BadRequestException, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NftsService } from './nfts.service';
import { CreateNFTDto, NftGetAllQuery } from './nfts.dto';

import { UsersService } from '../users/users.service';

@ApiTags('nfts')
@Controller('nfts')
export class NftsController {
  constructor(private readonly nftService: NftsService, public readonly userService: UsersService) {}

  @Get('/')
  async getAll(@Param() params: NftGetAllQuery) {
    return await this.nftService.find(params);
  }

  @Post('/')
  async createNft(@Body() nftData: CreateNFTDto, @Req() req) {
    const { polyglot } = req;

    const nftCreator = await this.userService.findByAddress(nftData.ownerAddress);

    if (!nftCreator || nftCreator.notAllowedToMint) {
      throw new BadRequestException(polyglot.t('User not allowed to mint NFTs'));
    }
    const nft = await this.nftService.save({
      ...nftData,
    });

    return {
      message: polyglot.t('Nft created successfully with id: %{id}', {
        id: nftData.tokenUri,
      }),
      nft,
    };
  }
}
