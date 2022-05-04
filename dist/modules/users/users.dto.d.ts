export declare class UserDto {
    readonly walletAddress: string;
}
export declare class UserUpdateProfileDto {
    readonly walletAddress: string;
    readonly username?: string;
    readonly userBio: string;
    readonly userAvatarUrl?: string;
    readonly userAvatarUrlCompressed?: string;
    readonly userAvatarUrlThumbnail?: string;
    readonly coverUrl?: string;
    readonly coverThumbnailUrl?: string;
    readonly socialUrl?: string;
    readonly twitterUrl?: string;
    readonly instagramUrl?: string;
    readonly facebookUrl?: string;
    signature?: string;
}
