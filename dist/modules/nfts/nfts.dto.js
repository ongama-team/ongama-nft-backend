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
exports.UpdateNftTokenDto = exports.CreateNFTDto = exports.NftGetAllQuery = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NftGetAllQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: false, type: () => Number }, page: { required: false, type: () => Number }, minPrice: { required: false, type: () => Number }, maxPrice: { required: false, type: () => Number }, category: { required: false, type: () => String }, sortField: { required: false, type: () => String }, sortOrder: { required: false, type: () => String }, walletAddress: { required: false, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], NftGetAllQuery.prototype, "limit", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], NftGetAllQuery.prototype, "page", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], NftGetAllQuery.prototype, "minPrice", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], NftGetAllQuery.prototype, "maxPrice", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], NftGetAllQuery.prototype, "category", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], NftGetAllQuery.prototype, "sortField", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], NftGetAllQuery.prototype, "sortOrder", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], NftGetAllQuery.prototype, "walletAddress", void 0);
exports.NftGetAllQuery = NftGetAllQuery;
class CreateNFTDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { category: { required: true, type: () => String }, tokenUri: { required: true, type: () => String }, description: { required: true, type: () => String }, fileSize: { required: true, type: () => Number }, fileType: { required: true, type: () => String }, name: { required: true, type: () => String }, ownerAddress: { required: true, type: () => String }, price: { required: true, type: () => Number }, storageFee: { required: true, type: () => Number }, storageFeeTransaction: { required: true, type: () => String }, url: { required: true, type: () => String }, urlCompressed: { required: false, type: () => String }, urlMedium: { required: false, type: () => String }, urlThumbnail: { required: false, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "category", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "tokenUri", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateNFTDto.prototype, "fileSize", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "fileType", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "ownerAddress", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateNFTDto.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateNFTDto.prototype, "storageFee", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "storageFeeTransaction", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "url", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "urlCompressed", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "urlMedium", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateNFTDto.prototype, "urlThumbnail", void 0);
exports.CreateNFTDto = CreateNFTDto;
class UpdateNftTokenDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { baseID: { required: true, type: () => String }, tokenID: { required: true, type: () => String }, mintTransactionHash: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateNftTokenDto.prototype, "baseID", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateNftTokenDto.prototype, "tokenID", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateNftTokenDto.prototype, "mintTransactionHash", void 0);
exports.UpdateNftTokenDto = UpdateNftTokenDto;
//# sourceMappingURL=nfts.dto.js.map