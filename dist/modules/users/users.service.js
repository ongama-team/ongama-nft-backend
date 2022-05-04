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
exports.UsersService = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const nfts_repository_1 = require("../nfts/nfts.repository");
let UsersService = class UsersService {
    constructor(userRepository, nftRepository) {
        this.userRepository = userRepository;
        this.nftRepository = nftRepository;
    }
    saveNewUser(data) {
        return this.userRepository.save(Object.assign(Object.assign({}, data), { createdAt: new Date(), updatedAt: new Date() }));
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.findOne(id);
    }
    findByAddress(walletAddress) {
        return this.userRepository.findOne({
            where: {
                walletAddress,
            },
        });
    }
    updateById(id, data) {
        return this.userRepository.update(id, data);
    }
    increment({ id, column, by = 1 }) {
        return this.userRepository.increment({ id }, column, by);
    }
    decrement({ id, column, by = 1 }) {
        return this.userRepository.decrement({ id }, column, by);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository, nfts_repository_1.NftRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map