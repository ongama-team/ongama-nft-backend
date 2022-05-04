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
exports.WalletSignatureGuard = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const web3Helper_1 = require("../utils/web3Helper");
const users_repository_1 = require("../modules/users/users.repository");
const logger_1 = require("../utils/logger");
const LOG_NAME = 'USER ACTION';
let WalletSignatureGuard = class WalletSignatureGuard {
    constructor(reflector, userRepo) {
        this.reflector = reflector;
        this.userRepo = userRepo;
    }
    async canActivate(context) {
        const [req] = context.getArgs();
        const signature = req.body.signature || req.headers.signature;
        const walletAddress = req.body.walletAddress || req.body.creatorAddress || web3Helper_1.Web3Helper.getAddressChecksum(req.headers.address);
        const data = req.body;
        if (!signature) {
            return false;
        }
        if (!(await web3Helper_1.validateWalletSignature({
            signature,
            walletAddress,
            data,
            validateTimestamp: true,
        }))) {
            logger_1.logger.error(LOG_NAME, 'signature failed', {
                data,
            });
            return false;
        }
        const foundUser = await this.userRepo.findOne({
            where: {
                walletAddress,
            },
        });
        if (!foundUser) {
            logger_1.logger.error(LOG_NAME, 'user not found', {
                data,
            });
            return false;
        }
        return true;
    }
};
WalletSignatureGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector, users_repository_1.UsersRepository])
], WalletSignatureGuard);
exports.WalletSignatureGuard = WalletSignatureGuard;
//# sourceMappingURL=walletSignature.guard.js.map