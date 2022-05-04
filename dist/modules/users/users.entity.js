"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const nfts_entity_1 = require("../nfts/nfts.entity");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, walletAddress: { required: true, type: () => String }, username: { required: true, type: () => String }, usernameLowercase: { required: true, type: () => String }, userAvatarUrl: { required: true, type: () => String }, userAvatarUrlThumbnail: { required: true, type: () => String }, userAvatarUrlCompressed: { required: true, type: () => String }, coverUrl: { required: true, type: () => String }, coverThumbnailUrl: { required: true, type: () => String }, userBio: { required: true, type: () => String }, banned: { required: true, type: () => Boolean }, verified: { required: true, type: () => Boolean }, active: { required: true, type: () => Boolean }, salesCount: { required: true, type: () => Number }, buysCount: { required: true, type: () => Number }, buysTotalAmount: { required: true, type: () => Number }, notAllowedToMint: { required: true, type: () => Boolean }, nftsCount: { required: true, type: () => Number }, nftsCreated: { required: true, type: () => [require("../nfts/nfts.entity").Nft] }, nftsOwned: { required: true, type: () => [require("../nfts/nfts.entity").Nft] }, createdAt: { required: true, type: () => Object }, updatedAt: { required: true, type: () => Object } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar', unique: true }),
    __metadata("design:type", String)
], User.prototype, "walletAddress", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "usernameLowercase", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "userAvatarUrl", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "userAvatarUrlThumbnail", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "userAvatarUrlCompressed", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "coverUrl", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "coverThumbnailUrl", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "userBio", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "banned", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'bool', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'int4', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "salesCount", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'int4', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "buysCount", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'float8', default: 0.0 }),
    __metadata("design:type", Number)
], User.prototype, "buysTotalAmount", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "notAllowedToMint", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'int4', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "nftsCount", void 0);
__decorate([
    typeorm_1.OneToMany(() => nfts_entity_1.Nft, (nft) => nft.creator),
    __metadata("design:type", Array)
], User.prototype, "nftsCreated", void 0);
__decorate([
    typeorm_1.OneToMany(() => nfts_entity_1.Nft, (nft) => nft.owner),
    __metadata("design:type", Array)
], User.prototype, "nftsOwned", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.User = User;
//# sourceMappingURL=users.entity.js.map