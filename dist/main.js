"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const requestIp = __importStar(require("request-ip"));
const swagger_1 = require("@nestjs/swagger");
const express_useragent_1 = __importDefault(require("express-useragent"));
require("dotenv/config");
const app_module_1 = require("./app.module");
const morgan_1 = __importDefault(require("./middlewares/morgan"));
const { PORT = 3000, APP_NAME = 'OngamaNft backend', APP_VERSION = '1.0' } = process.env;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.get(config_1.ConfigService);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('v1');
    app.use(requestIp.mw());
    app.use(express_useragent_1.default.express());
    app.use(morgan_1.default());
    const options = new swagger_1.DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(`The ${APP_NAME} is an API that serves a nft marketplace web app`)
        .setVersion(APP_VERSION)
        .addTag('OngaNFTs-API')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(PORT);
    common_1.Logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map