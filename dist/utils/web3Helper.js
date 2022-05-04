"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Helper = void 0;
require("dotenv/config");
const web3_1 = __importDefault(require("web3"));
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
//# sourceMappingURL=web3Helper.js.map