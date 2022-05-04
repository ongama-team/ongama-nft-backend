import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import InitListener from './listener/init.listener';
export default class WebSocketListener implements OnModuleInit {
    private initListener;
    private configService;
    private provider?;
    private chainWebSocketUrl;
    constructor(initListener: InitListener, configService: ConfigService);
    onModuleInit(): Promise<void>;
}
