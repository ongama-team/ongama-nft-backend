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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ethers_1 = require("ethers");
const nft_created_listener_1 = __importDefault(require("./nft-created.listener"));
const NFT_json_1 = __importDefault(require("../../abi/NFT.json"));
let InitListener = class InitListener {
    constructor(nftCreatedListener, configService) {
        this.nftCreatedListener = nftCreatedListener;
        this.configService = configService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.mintContractAddress = null;
        this.mintContractAddress = this.configService.get('MINT_CONTRACT_ADDRESS');
    }
    listen(provider) {
        this.initListener(provider);
        this.nftCreatedListener.listen(this.listener);
    }
    initListener(provider) {
        common_1.Logger.log(`Initializing listener - ${this.mintContractAddress}`);
        this.listener = new ethers_1.ethers.Contract(this.mintContractAddress, NFT_json_1.default, provider);
    }
};
InitListener = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nft_created_listener_1.default, config_1.ConfigService])
], InitListener);
exports.default = InitListener;
//# sourceMappingURL=init.listener.js.map