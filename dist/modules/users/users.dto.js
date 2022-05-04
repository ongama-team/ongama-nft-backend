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
exports.UserUpdateProfileDto = exports.UserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { walletAddress: { required: true, type: () => String } };
    }
}
exports.UserDto = UserDto;
class UserUpdateProfileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { walletAddress: { required: true, type: () => String }, username: { required: false, type: () => String }, userBio: { required: true, type: () => String }, userAvatarUrl: { required: false, type: () => String }, userAvatarUrlCompressed: { required: false, type: () => String }, userAvatarUrlThumbnail: { required: false, type: () => String }, coverUrl: { required: false, type: () => String }, coverThumbnailUrl: { required: false, type: () => String }, socialUrl: { required: false, type: () => String }, twitterUrl: { required: false, type: () => String }, instagramUrl: { required: false, type: () => String }, facebookUrl: { required: false, type: () => String }, signature: { required: false, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "walletAddress", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "userBio", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "userAvatarUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "userAvatarUrlCompressed", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "userAvatarUrlThumbnail", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "coverUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "coverThumbnailUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "socialUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "twitterUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "instagramUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "facebookUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserUpdateProfileDto.prototype, "signature", void 0);
exports.UserUpdateProfileDto = UserUpdateProfileDto;
//# sourceMappingURL=users.dto.js.map