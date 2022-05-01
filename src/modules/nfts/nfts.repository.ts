import { EntityRepository, Repository } from 'typeorm';
import { Nft } from '../nfts/nfts.entity';

@EntityRepository(Nft)
export class NftRepository extends Repository<Nft> {}
