import { Controller, Get, Param, Put, Body, CacheTTL, UseGuards, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { WalletSignatureGuard } from 'src/guards/walletSignature.guard';
import { NftsService } from '../nfts/nfts.service';
import { UsersService } from './users.service';
import { UserUpdateProfileDto, CreateUserDto } from './users.dto';

@ApiTags('users')
@Controller('users')
// @UseGuards(WalletSignatureGuard)
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
    // const { polyglot } = req;

    // const checksumAddress = Web3Helper.getAddressChecksum(userData.walletAddress);

    // const foundUser = await this.userService.findByAddress(checksumAddress);

    // if (!checksumAddress || !foundUser) {
    //   throw new BadRequestException(polyglot.t('Could not update user data - Error logged'));
    // }

    // if (
    //   !(await validateWalletSignature({
    //     data: userData,
    //     walletAddress: userData.walletAddress,
    //     signature: userData.signature,
    //   }))
    // ) {
    //   throw new BadRequestException(polyglot.t('Could not update user data - Error logged'));
    // }

    // if (userData.username && foundUser?.username?.toLocaleLowerCase() !== userData?.username?.toLocaleLowerCase()) {
    //   const newFoundUser = await this.userService.findByUsername(userData.username);

    //   if (newFoundUser && foundUser.walletAddress !== newFoundUser.walletAddress) {
    //     throw new BadRequestException(
    //       polyglot.t('Username is already taken: %{username} - %{address} Attempt', {
    //         username: userData.username,
    //         address: userData.walletAddress,
    //       }),
    //     );
    //   }
    // }

    // if (userData.signature) {
    //   delete userData.signature;
    // }

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
