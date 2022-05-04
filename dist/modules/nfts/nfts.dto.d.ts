export declare class NftGetAllQuery {
    limit?: number;
    page?: number;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    sortField?: string;
    sortOrder?: string;
    walletAddress?: string;
}
export declare class CreateNFTDto {
    category: string;
    tokenUri: string;
    description: string;
    fileSize: number;
    fileType: string;
    name: string;
    ownerAddress: string;
    price: number;
    storageFee: number;
    storageFeeTransaction: string;
    url: string;
    urlCompressed?: string;
    urlMedium?: string;
    urlThumbnail?: string;
}
export declare class UpdateNftTokenDto {
    baseID: string;
    tokenID: string;
    mintTransactionHash: string;
}
