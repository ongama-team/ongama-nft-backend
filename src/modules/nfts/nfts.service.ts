import { Between, IsNull, LessThanOrEqual, MoreThanOrEqual, Not, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import dayjs from 'dayjs';
import { Nft } from './nfts.entity';

import { UsersRepository } from '../users/users.repository';
import { CreateNFTDto, NftGetAllQuery } from './nfts.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class NftsService {
  constructor(
    @InjectRepository(Nft)
    private nftsRepository: Repository<Nft>,
    public readonly userRepository: UsersRepository,
    public readonly userService: UsersService,
  ) {}

  async save(data: CreateNFTDto): Promise<Nft> {
    let user = await this.userRepository.findOne({
      where: {
        walletAddress: data.ownerAddress,
      },
    });

    if (!user) {
      user = await this.userRepository.save({
        walletAddress: data.ownerAddress,
      });
    }

    const isVideo = (data?.fileType || '').toLowerCase().includes('video');
    const nft = new Nft();
    nft.creatorId = user?.id;
    nft.ownerId = user?.id;
    nft.fileSize = data.fileSize;
    nft.fileType = data.fileType;
    nft.ownerAddress = user?.walletAddress || data.ownerAddress;
    nft.creatorAddress = user?.walletAddress || data.ownerAddress;
    nft.tokenUri = data.tokenUri;
    nft.price = data.price;
    nft.storageFee = data.storageFee || 0;
    nft.storageFeeTransaction = data.storageFeeTransaction;
    nft.name = data.name || '';
    nft.description = data.description || '';
    nft.image = data.urlThumbnail || data.urlCompressed || data.url;
    nft.isVideo = isVideo;
    nft.url = data.url;
    nft.urlCompressed = data.urlCompressed;
    nft.urlThumbnail = data.urlThumbnail;
    nft.verified = user.verified;
    nft.dropId = data.dropId || null;
    nft.listed = true;
    nft.listedOnchain = true;
    nft.priority = 0;
    nft.createdAt = dayjs().format();
    nft.updatedAt = dayjs().format();
    nft.active = true;

    return this.nftsRepository.save(nft);
  }

  async findFeed({
    limit = 12,
    page = 1,
    sortField = 'priority',
    sortOrder = 'desc',
    minPrice,
    maxPrice,
  }: {
    limit?: number;
    page?: number;
    sortField?: string;
    sortOrder?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<{ nfts: Nft[]; meta: Record<string, number> }> {
    const where: any = {
      mintTransactionHash: Not(IsNull()),
      listed: true,
    };

    if (minPrice && !maxPrice) {
      where.price = MoreThanOrEqual(minPrice);
    }

    if (maxPrice && !minPrice) {
      where.price = LessThanOrEqual(maxPrice);
    }

    if (minPrice && maxPrice) {
      where.price = Between(minPrice, maxPrice);
    }

    if (!Number(page)) {
      return {
        nfts: [],
        meta: {
          page: 1,
          totalPages: 0,
          totalNfts: 0,
        },
      };
    }
    const take = limit;
    const skip = (page - 1) * take;

    const [nfts, totalNfts] = await this.nftsRepository.findAndCount({
      relations: ['owner'],
      order: {
        verified: 'DESC',
        [sortField || 'priority']: (sortOrder || 'DESC').toUpperCase(),
        id: 'DESC',
      },
      take,
      skip,
      where,
    });

    return {
      nfts,
      meta: {
        page,
        totalPages: Math.ceil(totalNfts / take),
        totalNfts,
      },
    };
  }

  findByTokenUri(tokenUri: string): Promise<Nft> {
    return this.nftsRepository.findOne(tokenUri);
  }

  findByTokenID(tokenID: number): Promise<Nft> {
    return this.nftsRepository.findOne({ where: { tokenID }, relations: ['owner'] });
  }

  updateToken(id: number, data: Partial<Nft>): Promise<UpdateResult> {
    return this.nftsRepository.update(id, {
      ...data,
    });
  }
}
