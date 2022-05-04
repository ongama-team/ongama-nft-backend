import { ethers } from 'ethers';
import { Networkish } from '@ethersproject/networks';
declare type KeepAliveParams = {
    onDisconnect: (err: any) => void;
    expectedPongBack?: number;
    checkInterval?: number;
};
export default class WebSocketProvider extends ethers.providers.WebSocketProvider {
    private readonly logger;
    constructor(url: string, network?: Networkish);
    initKeepAlive({ onDisconnect, expectedPongBack, checkInterval }: KeepAliveParams): void;
}
export {};
