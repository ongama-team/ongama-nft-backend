"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
require("dotenv/config");
const winston_1 = __importDefault(require("winston"));
const logging_winston_1 = require("@google-cloud/logging-winston");
const transports = [new winston_1.default.transports.Console()];
if (process.env.NODE_ENV !== 'development') {
    const loggingWinston = new logging_winston_1.LoggingWinston({
        prefix: process.env.NODE_ENV,
    });
    transports.push(loggingWinston);
}
exports.logger = winston_1.default.createLogger({
    level: 'info',
    transports,
});
exports.default = exports.logger;
//# sourceMappingURL=logger.js.map