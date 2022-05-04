"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const whitelistProd = [/\S+.airnfts.com(\/)?/];
const whitelistStaging = [/\S+.airnfts.com(\/)?/, /\S+blitzscale.vercel.app(\/)?/, /localhost:3000(\/)?/];
const isProd = process.env.NODE_ENV === 'production';
const corsOrigin = (origin, callback) => {
    if (!origin) {
        return callback(null, true);
    }
    const whitelist = isProd ? whitelistProd : whitelistStaging;
    if (whitelist.some((host) => host.test(origin))) {
        common_1.Logger.log('allowed cors for:', origin);
        return callback(null, true);
    }
    common_1.Logger.error('blocked cors for:', origin);
    return callback(new Error('Not allowed by CORS'));
};
exports.default = corsOrigin;
//# sourceMappingURL=corsOrigin.js.map