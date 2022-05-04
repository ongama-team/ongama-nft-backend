"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const dayjs_1 = __importDefault(require("dayjs"));
exports.default = () => morgan_1.default((tokens, req, res) => {
    var _a, _b;
    const config = [
        '\n',
        `Origin: ${((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.origin) || ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.referer)},`,
        `IP Address: ${req.clientIp}`,
        dayjs_1.default().format('YYYY-MM-DD hh:mm:ss:SS'),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        '\n',
        '-'.repeat(20),
        `\nHeaders: ${JSON.stringify(Object.assign(Object.assign({}, req.headers), { authorization: undefined }))}\n`,
        `query: ${JSON.stringify(Object.assign({}, (req.query || {})))}\n`,
    ];
    return config.join(' ');
});
//# sourceMappingURL=morgan.js.map