import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
@Entity('nfts')
export class Nft {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  tokenUri: string;

  @Column({ nullable: true, type: 'int8', default: null })
  creatorId: number;

  @Column({ nullable: true, type: 'varchar' })
  creatorAddress: string;

  @Column({ nullable: true, type: 'int8', default: null })
  ownerId: number;

  @Column({ nullable: true, type: 'varchar' })
  ownerAddress: string;

  @Column({ nullable: true, type: 'varchar' })
  ownerUsername: string;

  @Column({ nullable: true, type: 'varchar' })
  creatorUsername: string;

  @Column({ nullable: true, type: 'varchar' })
  mintTransactionHash: string;

  @Column({ nullable: true, type: 'int8', unique: true })
  tokenID: number;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'int4' })
  priority: number;

  @Column({ nullable: false, type: 'varchar' })
  description: string;

  @Column({ nullable: false, type: 'float4' })
  fileSize: number;

  @Column({ nullable: true, type: 'bool', default: false })
  listed: boolean;

  @Column({ nullable: true, type: 'bool', default: false })
  listedOnChain: boolean;

  @Column({ nullable: true, type: 'bool', default: false })
  verified: boolean;

  @Column({ nullable: true, type: 'varchar' })
  image: string;

  @Column({ nullable: true, type: 'varchar' })
  url: string;

  @Column({ nullable: true, type: 'varchar' })
  urlCompressed: string;

  @Column({ nullable: true, type: 'varchar' })
  urlThumbnail: string;

  @Column({ nullable: true, type: 'float8' })
  price: number;

  @Column({ nullable: true, type: 'float8' })
  storageFee: number;

  @Column({ nullable: true, type: 'varchar' })
  storageFeeTransaction: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  fileType: string;

  @Column({ nullable: true, type: 'bool', default: false })
  isVideo: boolean;

  @Column({ nullable: true, type: 'bool', default: true })
  active: boolean;

  @ManyToOne(() => User, (creator: User) => creator.nftsCreated)
  @JoinColumn()
  creator: User;

  @ManyToOne(() => User, (creator: User) => creator.nftsOwned)
  @JoinColumn()
  owner: User;

  @CreateDateColumn({
    default: () => new Date(),
  })
  createdAt: Date | string;

  @UpdateDateColumn({
    default: () => new Date(),
  })
  updatedAt: Date | string;
}
