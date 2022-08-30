import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UserDto {
  readonly walletAddress: string;
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
