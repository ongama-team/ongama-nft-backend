import { Controller, Get, Req, Param, Put, Body, BadRequestException, CacheTTL } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { NftsService } from '../nfts/nfts.service';
import { UsersService } from './users.service';
import { UserUpdateProfileDto } from './users.dto';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly nftService: NftsService) {}

  // @Put('/profile')
  // async updateProfile(@Body() userData: UserUpdateProfileDto, @Req() req, @Headers('cf-ipcountry') countryISO) {
  //   const { polyglot } = req;

  //   const checksumAddress = Web3Helper.getAddressChecksum(userData.walletAddress);

  //   const foundUser = await this.userService.findByAddress(checksumAddress);

  //   if (!checksumAddress || !foundUser) {
  //     throw new BadRequestException(polyglot.t('Could not update user data - Error logged'));
  //   }

  //   if (
  //     !(await validateWalletSignature({
  //       data: userData,
  //       walletAddress: userData.walletAddress,
  //       signature: userData.signature,
  //     }))
  //   ) {
  //     throw new BadRequestException(polyglot.t('Could not update user data - Error logged'));
  //   }

  //   if (userData.username && foundUser?.username?.toLocaleLowerCase() !== userData?.username?.toLocaleLowerCase()) {
  //     const newFoundUser = await this.userService.findByUsername(userData.username);

  //     if (newFoundUser && foundUser.walletAddress !== newFoundUser.walletAddress) {
  //       throw new BadRequestException(
  //         polyglot.t('Username is already taken: %{username} - %{address} Attempt', {
  //           username: userData.username,
  //           address: userData.walletAddress,
  //         }),
  //       );
  //     }
  //   }

  //   if (userData.signature) {
  //     delete userData.signature;
  //   }

  //   await this.userService.updateById(foundUser.id, {
  //     username: userData?.username || foundUser?.username || null,
  //     userBio: userData?.userBio || foundUser?.userBio || null,
  //     userAvatarUrl: userData?.userAvatarUrl || foundUser?.userAvatarUrl || null,
  //     userAvatarUrlCompressed: userData?.userAvatarUrl
  //       ? userData?.userAvatarUrlCompressed || null
  //       : foundUser?.userAvatarUrlCompressed || null,
  //     userAvatarUrlThumbnail: userData?.userAvatarUrl
  //       ? userData?.userAvatarUrlThumbnail || null
  //       : foundUser?.userAvatarUrlThumbnail || null,
  //     coverUrl: userData?.coverUrl ? userData?.coverUrl || null : foundUser?.coverUrl || null,
  //     coverThumbnailUrl: userData?.coverThumbnailUrl
  //       ? userData?.coverThumbnailUrl || null
  //       : foundUser?.coverThumbnailUrl || null,
  //     usernameLowercase: (userData?.username || foundUser?.username || '')?.toLocaleLowerCase(),
  //   });

  //   return {
  //     statusCode: 200,
  //   };
  // }

  @CacheTTL(60)
  @Get('/:addressOrUsername')
  async getOne(@Param('addressOrUsername') addressOrUsername: string) {
    let user = await this.userService.findByAddress(addressOrUsername);

    if (!user) {
      user = await this.userService.saveNewUser({
        userAvatarUrl: '',
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
