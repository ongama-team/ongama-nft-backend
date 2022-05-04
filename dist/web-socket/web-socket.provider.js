"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const common_1 = require("@nestjs/common");
class WebSocketProvider extends ethers_1.ethers.providers.WebSocketProvider {
    constructor(url, network) {
        super(url, network);
        this.logger = new common_1.Logger(this.constructor.name);
    }
    initKeepAlive({ onDisconnect, expectedPongBack = 15000, checkInterval = 7500 }) {
        let pingTimeout = null;
        let keepAliveInterval = null;
        this._websocket.on('open', () => {
            this.logger.log('Opening websocket connection');
            keepAliveInterval = setInterval(() => {
                this._websocket.ping();
                pingTimeout = setTimeout(() => {
                    this._websocket.terminate();
                }, expectedPongBack);
            }, checkInterval);
        });
        this._websocket.on('close', (err) => {
            this.logger.log('Closing websocket connection');
            if (keepAliveInterval)
                clearInterval(keepAliveInterval);
            if (pingTimeout)
                clearTimeout(pingTimeout);
            onDisconnect(err);
        });
        this._websocket.on('pong', () => {
            this.logger.debug('Received pong, connection still alive, clearing the timeout');
            if (pingTimeout)
                clearInterval(pingTimeout);
        });
    }
}
exports.default = WebSocketProvider;
//# sourceMappingURL=web-socket.provider.js.map