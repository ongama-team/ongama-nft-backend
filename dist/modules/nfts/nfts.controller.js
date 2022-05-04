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
exports.NftsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nfts_service_1 = require("./nfts.service");
const nfts_dto_1 = require("./nfts.dto");
const users_service_1 = require("../users/users.service");
let NftsController = class NftsController {
    constructor(nftService, userService) {
        this.nftService = nftService;
        this.userService = userService;
    }
    async createNft(nftData, req) {
        const { polyglot } = req;
        const nftCreator = await this.userService.findByAddress(nftData.ownerAddress);
        if (!nftCreator || nftCreator.notAllowedToMint) {
            throw new common_1.BadRequestException(polyglot.t('User not allowed to mint NFTs'));
        }
        const nft = await this.nftService.save(Object.assign({}, nftData));
        return {
            message: polyglot.t('Nft created successfully with id: %{id}', {
                id: nftData.tokenUri,
            }),
            nft,
        };
    }
};
__decorate([
    common_1.Post('/'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nfts_dto_1.CreateNFTDto, Object]),
    __metadata("design:returntype", Promise)
], NftsController.prototype, "createNft", null);
NftsController = __decorate([
    swagger_1.ApiTags('nfts'),
    common_1.Controller('nfts'),
    __metadata("design:paramtypes", [nfts_service_1.NftsService, users_service_1.UsersService])
], NftsController);
exports.NftsController = NftsController;
//# sourceMappingURL=nfts.controller.js.map