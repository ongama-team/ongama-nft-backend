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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftsService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const nfts_entity_1 = require("./nfts.entity");
const users_repository_1 = require("../users/users.repository");
const users_service_1 = require("../users/users.service");
let NftsService = class NftsService {
    constructor(nftsRepository, userRepository, userService) {
        this.nftsRepository = nftsRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }
    async save(data) {
        let user = await this.userRepository.findOne({
            where: {
                walletAddress: '',
            },
        });
        if (!user) {
            user = await this.userRepository.save({
                walletAddress: '',
            });
        }
        const isVideo = ((data === null || data === void 0 ? void 0 : data.fileType) || '').toLowerCase().includes('video');
        const nft = new nfts_entity_1.Nft();
        nft.creatorId = user === null || user === void 0 ? void 0 : user.id;
        nft.ownerId = user === null || user === void 0 ? void 0 : user.id;
        nft.fileSize = data.fileSize;
        nft.fileType = data.fileType;
        nft.ownerAddress = (user === null || user === void 0 ? void 0 : user.walletAddress) || data.ownerAddress;
        nft.creatorAddress = (user === null || user === void 0 ? void 0 : user.walletAddress) || data.ownerAddress;
        nft.creatorUsername = (user === null || user === void 0 ? void 0 : user.username) || '';
        nft.ownerUsername = (user === null || user === void 0 ? void 0 : user.username) || '';
        nft.tokenUri = data.tokenUri;
        nft.price = data.price;
        nft.storageFee = data.storageFee || 0;
        nft.storageFeeTransaction = data.storageFeeTransaction;
        nft.name = data.name || '';
        nft.description = data.description || '';
        nft.image = data.urlThumbnail || data.urlCompressed || data.url;
        nft.isVideo = isVideo;
        nft.url = data.url;
        nft.urlCompressed = data.urlCompressed;
        nft.urlThumbnail = data.urlThumbnail;
        nft.verified = user.verified;
        nft.listed = true;
        nft.listedOnChain = true;
        nft.priority = 0;
        nft.createdAt = dayjs_1.default().format();
        nft.updatedAt = dayjs_1.default().format();
        nft.active = true;
        return this.nftsRepository.save(nft);
    }
    findByTokenUri(tokenUri) {
        return this.nftsRepository.findOne(tokenUri);
    }
    updateToken(id, data) {
        return this.nftsRepository.update(id, Object.assign({}, data));
    }
};
NftsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(nfts_entity_1.Nft)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_repository_1.UsersRepository,
        users_service_1.UsersService])
], NftsService);
exports.NftsService = NftsService;
//# sourceMappingURL=nfts.service.js.map