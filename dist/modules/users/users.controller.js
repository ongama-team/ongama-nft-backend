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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nfts_service_1 = require("../nfts/nfts.service");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userService, nftService) {
        this.userService = userService;
        this.nftService = nftService;
    }
    async getOne(addressOrUsername) {
        let user = await this.userService.findByAddress(addressOrUsername);
        if (!user) {
            user = await this.userService.saveNewUser({
                userAvatarUrl: '',
                userBio: '',
                username: '',
                walletAddress: addressOrUsername,
            });
            return {
                user,
            };
        }
        return {
            user,
        };
    }
};
__decorate([
    common_1.CacheTTL(60),
    common_1.Get('/:addressOrUsername'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('addressOrUsername')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOne", null);
UsersController = __decorate([
    swagger_1.ApiTags('users'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, nfts_service_1.NftsService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map