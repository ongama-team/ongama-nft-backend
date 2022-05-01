import 'dotenv/config';
import Web3 from 'web3';

export interface WebInitParams {
  web3: Web3;
  mintContractAddress: string;
  deployerAddress: string;
  chainId: number;
}

function initWeb3Instance(): WebInitParams {
  const mintContractAddress = (process.env.MINT_CONTRACT_ADDRESS as string).toLowerCase();
  const deployerAddress = (process.env.DEPLOYER_ADDRESS as string).toLowerCase();

  const nodeUrl = process.env.WEB3_NODE_RPC as string;
  const chainId = Number(process.env.CHAIN_ID as string);
  const web3 = new Web3(nodeUrl);
  return {
    mintContractAddress,
    web3,
    deployerAddress,
    chainId,
  };
}

export class Web3Helper {
  private static lazyInit: WebInitParams;

  public static getWeb3(): WebInitParams {
    Web3Helper.lazyInit = Web3Helper.lazyInit || initWeb3Instance();
    return Web3Helper.lazyInit;
  }

  public static getAddressChecksum(address: string): string {
    return this.getWeb3().web3.utils.toChecksumAddress(address);
  }
}
