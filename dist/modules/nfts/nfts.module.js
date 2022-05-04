"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nfts_service_1 = require("./nfts.service");
const nfts_controller_1 = require("./nfts.controller");
const nfts_entity_1 = require("./nfts.entity");
const users_repository_1 = require("../users/users.repository");
const users_service_1 = require("../users/users.service");
let NftsModule = class NftsModule {
};
NftsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([nfts_entity_1.Nft])],
        providers: [nfts_service_1.NftsService, users_repository_1.UsersRepository, users_service_1.UsersService],
        controllers: [nfts_controller_1.NftsController],
    })
], NftsModule);
exports.NftsModule = NftsModule;
//# sourceMappingURL=nfts.module.js.map