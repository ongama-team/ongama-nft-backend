import { IsString, IsOptional } from 'class-validator';

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
  bio?: string;
}

export class UserUpdateProfileDto {
  @IsString()
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
  readonly bio: string;

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
