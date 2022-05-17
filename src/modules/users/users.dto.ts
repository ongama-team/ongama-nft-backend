import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UserDto {
  readonly walletAddress: string;
}

export class CreateUserDto {
  @IsString()
  walletAddress: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  usernameLowercase?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  avatarUrlThumbnail?: string;

  @IsString()
  @IsOptional()
  avatarUrlCompressed?: string;

  @IsString()
  @IsOptional()
  coverUrl?: string;

  @IsString()
  @IsOptional()
  coverThumbnailUrl?: string;

  @IsString()
  @IsOptional()
  userBio?: string;
}

export class UserUpdateProfileDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly walletAddress: string;

  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsString()
  @IsOptional()
  readonly usernameLowercase?: string;

  @IsString()
  @IsOptional()
  readonly userBio: string;

  @IsString()
  @IsOptional()
  readonly avatarUrl?: string;

  @IsString()
  @IsOptional()
  readonly avatarUrlCompressed?: string;

  @IsString()
  @IsOptional()
  readonly avatarUrlThumbnail?: string;

  @IsString()
  @IsOptional()
  readonly coverUrl?: string;

  @IsString()
  @IsOptional()
  readonly coverThumbnailUrl?: string;

  @IsString()
  signature?: string;
}
