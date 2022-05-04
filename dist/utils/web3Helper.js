"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWalletSignature = exports.Web3Helper = void 0;
require("dotenv/config");
const web3_1 = __importDefault(require("web3"));
const dayjs_1 = __importDefault(require("dayjs"));
const Cryptographer_1 = require("./Cryptographer");
const Utils_1 = require("./Utils");
const logger_1 = require("./logger");
function initWeb3Instance() {
    const mintContractAddress = process.env.MINT_CONTRACT_ADDRESS.toLowerCase();
    const deployerAddress = process.env.DEPLOYER_ADDRESS.toLowerCase();
    const nodeUrl = process.env.WEB3_NODE_RPC;
    const chainId = Number(process.env.CHAIN_ID);
    const web3 = new web3_1.default(nodeUrl);
    return {
        mintContractAddress,
        web3,
        deployerAddress,
        chainId,
    };
}
class Web3Helper {
    static getWeb3() {
        Web3Helper.lazyInit = Web3Helper.lazyInit || initWeb3Instance();
        return Web3Helper.lazyInit;
    }
    static getAddressChecksum(address) {
        return this.getWeb3().web3.utils.toChecksumAddress(address);
    }
}
exports.Web3Helper = Web3Helper;
const validateWalletSignature = async ({ data, walletAddress, signature, validateTimestamp = false, }) => {
    var _a, _b;
    const { web3 } = Web3Helper.getWeb3();
    const cleanedUpFields = JSON.stringify(Utils_1.orderAndRemoveEmpty(Object.assign(Object.assign({}, (data || {})), { signature: undefined })));
    const hashedData = web3.utils.sha3(cleanedUpFields);
    console.log('Signature data:', {
        data,
        signature,
        cleanedUpFields,
        hashedData,
    });
    const signerAddress = Cryptographer_1.getSignerAddress(hashedData, signature);
    if (validateTimestamp && dayjs_1.default(data === null || data === void 0 ? void 0 : data.timestamp).isBefore(dayjs_1.default().subtract(2, 'minutes').format())) {
        logger_1.logger.error('Replay attack prevention - old signature submitted (More than 2 minutes)', {
            data,
            signature,
            cleanedUpFields,
            hashedData,
        });
        return false;
    }
    return (signerAddress.toLowerCase() === walletAddress.toLowerCase() &&
        (signerAddress.toLowerCase() === ((_a = data === null || data === void 0 ? void 0 : data.walletAddress) === null || _a === void 0 ? void 0 : _a.toLowerCase()) ||
            signerAddress.toLowerCase() === ((_b = data === null || data === void 0 ? void 0 : data.creatorAddress) === null || _b === void 0 ? void 0 : _b.toLowerCase())));
};
exports.validateWalletSignature = validateWalletSignature;
//# sourceMappingURL=web3Helper.js.map