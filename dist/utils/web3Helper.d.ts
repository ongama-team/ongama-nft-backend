import 'dotenv/config';
import Web3 from 'web3';
export interface WebInitParams {
    web3: Web3;
    mintContractAddress: string;
    deployerAddress: string;
    chainId: number;
}
export declare class Web3Helper {
    private static lazyInit;
    static getWeb3(): WebInitParams;
    static getAddressChecksum(address: string): string;
}
