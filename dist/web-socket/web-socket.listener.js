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
const web_socket_provider_1 = __importDefault(require("../web-socket/web-socket.provider"));
const init_listener_1 = __importDefault(require("./listener/init.listener"));
let WebSocketListener = class WebSocketListener {
    constructor(initListener, configService) {
        this.initListener = initListener;
        this.configService = configService;
        this.provider = null;
        this.chainWebSocketUrl = null;
        this.chainWebSocketUrl = this.configService.get('CHAIN_WEB_SOCKET_URL');
    }
    async onModuleInit() {
        common_1.Logger.log(`Starting listener for onchain events`);
        if (this.provider) {
            this.provider.destroy();
        }
        this.provider = new web_socket_provider_1.default(this.chainWebSocketUrl);
        this.initListener.listen(this.provider);
        this.provider.initKeepAlive({
            onDisconnect: this.onModuleInit.bind(this),
        });
    }
};
WebSocketListener = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [init_listener_1.default, config_1.ConfigService])
], WebSocketListener);
exports.default = WebSocketListener;
//# sourceMappingURL=web-socket.listener.js.map