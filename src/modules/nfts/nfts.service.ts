import { LessThanOrEqual, MoreThanOrEqual, Repository, UpdateResult } from 'typeorm';
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
    // const walletAddress = Web3Helper.getAddressChecksum(data?.ownerAddress);
    let user = await this.userRepository.findOne({
      where: {
        walletAddress: '',
      },
    });

    if (!user) {
      user = await this.userRepository.save({
        walletAddress: '',
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
    nft.creatorUsername = user?.username || '';
    nft.ownerUsername = user?.username || '';
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
    nft.listed = true;
    nft.listedOnChain = true;
    nft.priority = 0;
    nft.createdAt = dayjs().format();
    nft.updatedAt = dayjs().format();
    nft.active = true;

    return this.nftsRepository.save(nft);
  }

  find(params: NftGetAllQuery): Promise<Nft[]> {
    const take = params.limit || null;
    const skip = take ? (params.page - 1) * take : 0;
    const sortBy = {};
    if (params.sortField && Object.keys(Nft).includes(params.sortField))
      sortBy[params.sortField] = params.sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // --
    return this.nftsRepository.find({
      where: {
        ...(typeof params.walletAddress !== 'undefined' && params.walletAddress !== null
          ? { walletAddress: params.walletAddress }
          : {}),
        ...(typeof params.maxPrice !== 'undefined' && params.maxPrice !== null
          ? { price: LessThanOrEqual(params.maxPrice) }
          : {}),
        ...(typeof params.minPrice !== 'undefined' && params.minPrice !== null
          ? { price: MoreThanOrEqual(params.minPrice) }
          : {}),
      },
      order: sortBy,
      skip,
      take,
    });
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
