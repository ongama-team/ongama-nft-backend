import { Nft } from '../nfts/nfts.entity';
export declare class User {
    id: number;
    walletAddress: string;
    username: string;
    usernameLowercase: string;
    userAvatarUrl: string;
    userAvatarUrlThumbnail: string;
    userAvatarUrlCompressed: string;
    coverUrl: string;
    coverThumbnailUrl: string;
    userBio: string;
    banned: boolean;
    verified: boolean;
    active: boolean;
    salesCount: number;
    buysCount: number;
    buysTotalAmount: number;
    notAllowedToMint: boolean;
    nftsCount: number;
    nftsCreated: Nft[];
    nftsOwned: Nft[];
    createdAt: Date | string;
    updatedAt: Date | string;
}
