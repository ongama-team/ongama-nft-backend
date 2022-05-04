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
exports.Nft = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
let Nft = class Nft {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, tokenUri: { required: true, type: () => String }, creatorId: { required: true, type: () => Number }, creatorAddress: { required: true, type: () => String }, ownerId: { required: true, type: () => Number }, ownerAddress: { required: true, type: () => String }, ownerUsername: { required: true, type: () => String }, creatorUsername: { required: true, type: () => String }, mintTransactionHash: { required: true, type: () => String }, tokenID: { required: true, type: () => Number }, name: { required: true, type: () => String }, priority: { required: true, type: () => Number }, description: { required: true, type: () => String }, fileSize: { required: true, type: () => Number }, listed: { required: true, type: () => Boolean }, listedOnChain: { required: true, type: () => Boolean }, verified: { required: true, type: () => Boolean }, image: { required: true, type: () => String }, url: { required: true, type: () => String }, urlCompressed: { required: true, type: () => String }, urlThumbnail: { required: true, type: () => String }, price: { required: true, type: () => Number }, storageFee: { required: true, type: () => Number }, storageFeeTransaction: { required: true, type: () => String }, fileType: { required: true, type: () => String }, isVideo: { required: true, type: () => Boolean }, active: { required: true, type: () => Boolean }, creator: { required: true, type: () => require("../users/users.entity").User }, owner: { required: true, type: () => require("../users/users.entity").User }, createdAt: { required: true, type: () => Object }, updatedAt: { required: true, type: () => Object } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", Number)
], Nft.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Nft.prototype, "tokenUri", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'int8', default: null }),
    __metadata("design:type", Number)
], Nft.prototype, "creatorId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "creatorAddress", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'int8', default: null }),
    __metadata("design:type", Number)
], Nft.prototype, "ownerId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "ownerAddress", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "ownerUsername", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "creatorUsername", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "mintTransactionHash", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'int8', unique: true }),
    __metadata("design:type", Number)
], Nft.prototype, "tokenID", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'int4' }),
    __metadata("design:type", Number)
], Nft.prototype, "priority", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'float4' }),
    __metadata("design:type", Number)
], Nft.prototype, "fileSize", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], Nft.prototype, "listed", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], Nft.prototype, "listedOnChain", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], Nft.prototype, "verified", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "urlCompressed", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "urlThumbnail", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'float8' }),
    __metadata("design:type", Number)
], Nft.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'float8' }),
    __metadata("design:type", Number)
], Nft.prototype, "storageFee", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], Nft.prototype, "storageFeeTransaction", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar', default: '' }),
    __metadata("design:type", String)
], Nft.prototype, "fileType", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], Nft.prototype, "isVideo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'bool', default: true }),
    __metadata("design:type", Boolean)
], Nft.prototype, "active", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, (creator) => creator.nftsCreated),
    typeorm_1.JoinColumn(),
    __metadata("design:type", users_entity_1.User)
], Nft.prototype, "creator", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, (creator) => creator.nftsOwned),
    typeorm_1.JoinColumn(),
    __metadata("design:type", users_entity_1.User)
], Nft.prototype, "owner", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        default: () => new Date(),
    }),
    __metadata("design:type", Object)
], Nft.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        default: () => new Date(),
    }),
    __metadata("design:type", Object)
], Nft.prototype, "updatedAt", void 0);
Nft = __decorate([
    typeorm_1.Entity('nfts')
], Nft);
exports.Nft = Nft;
//# sourceMappingURL=nfts.entity.js.map