import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NftsDropsService } from './nfts-drops.service';
import { NftsService } from '../nfts/nfts.service';
import { CreateDropDto } from './nfts-drops.dto';

@ApiTags('nfts-drops')
@Controller('nfts-drops')
export class NftsDropsController {
  constructor(private readonly dropService: NftsDropsService, private readonly nftService: NftsService) {}

  @Get('/:dropID')
  async findOneByDropId(@Param('dropID') dropID: string) {
    const drop = await this.dropService.findOneByDropID(dropID);
    // const dropRelatedNfts = await this.nftService.
    return {
      drop,
      // dropRelatedNfts,
    };
  }

  @Post('/')
  async createDrop(@Body() dropData: CreateDropDto) {
    const drop = await this.dropService.save(dropData);
    return {
      drop,
    };
  }
}
