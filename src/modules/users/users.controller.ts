import { Controller, Get, Param, Put, Body, CacheTTL, UseGuards, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WalletSignatureGuard } from 'src/guards/walletSignature.guard';
import { NftsService } from '../nfts/nfts.service';
import { UsersService } from './users.service';
import { UserUpdateProfileDto, CreateUserDto } from './users.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(WalletSignatureGuard)
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly nftService: NftsService) {}

  @Post('/createUser')
  async saveNewUser(@Body() data: CreateUserDto) {
    await this.userService.saveNewUser(data);

    return {
      statusCode: 200,
    };
  }

  @Put('/profile')
  async updateProfile(@Body() data: UserUpdateProfileDto) {
    const {
      id,
      username,
      userBio,
      avatarUrl,
      avatarUrlCompressed,
      avatarUrlThumbnail,
      coverThumbnailUrl,
      coverUrl,
      usernameLowercase,
    } = data;

    await this.userService.updateById(id, {
      username,
      userBio,
      avatarUrl,
      avatarUrlCompressed,
      avatarUrlThumbnail,
      coverUrl,
      coverThumbnailUrl,
      usernameLowercase,
    });

    return {
      statusCode: 200,
    };
  }

  @CacheTTL(60)
  @Get('/:addressOrUsername')
  async getOne(@Param('addressOrUsername') addressOrUsername: string) {
    let user = await this.userService.findByAddress(addressOrUsername);

    if (!user) {
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
