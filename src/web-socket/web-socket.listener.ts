import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import WebSocketProvider from '../web-socket/web-socket.provider';
import InitListener from './listener/init.listener';

@Injectable()
export default class WebSocketListener implements OnModuleInit {
  private provider?: WebSocketProvider = null;
  private chainWebSocketUrl = null;

  constructor(private initListener: InitListener, private configService: ConfigService) {
    this.chainWebSocketUrl = this.configService.get<number>('CHAIN_WEB_SOCKET_URL');
  }

  async onModuleInit() {
    Logger.log(`Starting listener for onchain events`);
    if (this.provider) {
      this.provider.destroy();
    }
    this.provider = new WebSocketProvider(this.chainWebSocketUrl);

    this.initListener.listen(this.provider);

    this.provider.initKeepAlive({
      onDisconnect: this.onModuleInit.bind(this),
    });
  }
}
