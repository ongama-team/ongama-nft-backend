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
const common_1 = require("@nestjs/common");
const nfts_service_1 = require("../../modules/nfts/nfts.service");
const logger_1 = require("../../utils/logger");
const web3Helper_1 = require("../../utils/web3Helper");
const users_service_1 = require("../../modules/users/users.service");
let NftCreatedListener = class NftCreatedListener {
    constructor(nftService, userService) {
        this.nftService = nftService;
        this.userService = userService;
    }
    listen(listener) {
        listener.on(listener.filters.Minted(), async (minter, price, nftID, uri, event) => {
            logger_1.logger.info(`Received event for NFT created for nft - ${nftID}, to address - ${minter}, event - ${JSON.stringify(event)}`);
            const nft = await this.nftService.findByTokenUri(uri);
            if (!nft) {
                throw new common_1.NotFoundException('NFT not found');
            }
            const { mintContractAddress, web3 } = web3Helper_1.Web3Helper.getWeb3();
            const transactionReceipt = await web3.eth.getTransactionReceipt(event.transactionHash.toLowerCase());
            if (mintContractAddress.toLowerCase() !== transactionReceipt.to.toLowerCase()) {
                logger_1.logger.warn('Sent to the wrong contract address', {
                    to: transactionReceipt.to,
                    from: transactionReceipt.from,
                });
                throw new common_1.BadRequestException('FAILED_VALIDATING_MINT: Mint request could not be validated');
            }
            if (!transactionReceipt.blockHash || !transactionReceipt.blockNumber || !transactionReceipt.status) {
                logger_1.logger.warn('Transaction failed or might still be pending', {
                    blockHash: transactionReceipt.blockHash,
                    blockNumber: transactionReceipt.blockNumber,
                    status: transactionReceipt.status,
                });
                throw new common_1.BadRequestException('FAILED_VALIDATING_MINT: Mint request could not be validated');
            }
            await Promise.all([
                await this.nftService.updateToken(nft.id, {
                    tokenUri: uri,
                    mintTransactionHash: event.transactionHash.toLowerCase(),
                    tokenID: nftID,
                    price: Number(web3.utils.toWei(price.toString(), 'ether')),
                }),
                await this.userService.increment({ id: nft.creator.id, column: 'nftsCount' }),
            ]);
        });
    }
};
NftCreatedListener = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nfts_service_1.NftsService, users_service_1.UsersService])
], NftCreatedListener);
exports.default = NftCreatedListener;
//# sourceMappingURL=nft-created.listener.js.map