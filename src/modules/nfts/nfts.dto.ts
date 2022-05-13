import { IsNumber, IsString, IsOptional } from 'class-validator';

export class NftGetAllQuery {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  sortField?: string;

  @IsString()
  @IsOptional()
  sortOrder?: string;

  @IsString()
  @IsOptional()
  walletAddress?: string;
}

export class CreateNFTDto {
  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  tokenUri: string;

  @IsString()
  description: string;

  @IsNumber()
  fileSize: number;

  @IsString()
  fileType: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  ownerAddress: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  storageFee: number;

  @IsOptional()
  @IsString()
  storageFeeTransaction: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  @IsOptional()
  urlCompressed?: string;

  @IsString()
  @IsOptional()
  urlMedium?: string;

  @IsString()
  @IsOptional()
  urlThumbnail?: string;
}
export class UpdateNftTokenDto {
  @IsString()
  @IsOptional()
  baseID: string;

  @IsString()
  tokenID: string;

  @IsString()
  mintTransactionHash: string;
}

export class TransferNFTDto {
  @IsString()
  @IsOptional()
  from: string;

  @IsString()
  @IsOptional()
  to: string;

  @IsString()
  tokenID: string;
}
