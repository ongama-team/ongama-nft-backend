import { ethers } from 'ethers';
import { Logger } from '@nestjs/common';
import { Networkish } from '@ethersproject/networks';

type KeepAliveParams = {
  onDisconnect: (err: any) => void;
  expectedPongBack?: number;
  checkInterval?: number;
};

export default class WebSocketProvider extends ethers.providers.WebSocketProvider {
  private readonly logger = new Logger(this.constructor.name);

  constructor(url: string, network?: Networkish) {
    super(url, network);
  }

  /**
   * Found on https://github.com/ethers-io/ethers.js/issues/1053.
   */
  public initKeepAlive({ onDisconnect, expectedPongBack = 15000, checkInterval = 7500 }: KeepAliveParams) {
    let pingTimeout: NodeJS.Timeout | null = null;
    let keepAliveInterval: NodeJS.Timeout | null = null;

    this._websocket.on('open', () => {
      this.logger.log('Opening websocket connection');
      keepAliveInterval = setInterval(() => {
        this._websocket.ping();

        // Use `WebSocket#terminate()`, which immediately destroys the connection,
        // instead of `WebSocket#close()`, which waits for the close timer.
        // Delay should be equal to the interval at which your server
        // sends out pings plus a conservative assumption of the latency.
        pingTimeout = setTimeout(() => {
          this._websocket.terminate();
        }, expectedPongBack);
      }, checkInterval);
    });

    this._websocket.on('close', (err: any) => {
      this.logger.log('Closing websocket connection');
      if (keepAliveInterval) clearInterval(keepAliveInterval);
      if (pingTimeout) clearTimeout(pingTimeout);
      onDisconnect(err);
    });

    this._websocket.on('pong', () => {
      this.logger.debug('Received pong, connection still alive, clearing the timeout');
      if (pingTimeout) clearInterval(pingTimeout);
    });
  }
}
