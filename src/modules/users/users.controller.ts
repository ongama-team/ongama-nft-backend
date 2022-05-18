import { Controller, Get, Param, Put, Body, CacheTTL, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WalletSignatureGuard } from 'src/guards/walletSignature.guard';
import { isValidAddress } from 'src/utils/Utils';
import { NftsService } from '../nfts/nfts.service';
import { UsersService } from './users.service';
import { UserUpdateProfileDto } from './users.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(WalletSignatureGuard)
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly nftService: NftsService) {}

  @Put('/profile')
  async updateProfile(@Body() data: UserUpdateProfileDto) {
    delete data.signature;
    await this.userService.updateById(data.id, data);

    return {
      statusCode: 200,
    };
  }

  @CacheTTL(60)
  @Get('/:addressOrUsername')
  async getOne(@Param('addressOrUsername') addressOrUsername: string) {
    let user = await this.userService.findByAddress(addressOrUsername);

    if (!user) {
      const valid = isValidAddress(addressOrUsername);
      if (!valid) {
        throw new BadRequestException('The address or username is not valid');
      }
      user = await this.userService.saveNewUser({
        avatarUrl: '',
        userBio: '',
        username: '',
        walletAddress: addressOrUsername,
      });

      return {
        user,
      };
    }

    return {
      user,
    };
  }
}
