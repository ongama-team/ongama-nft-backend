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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const redisStore = __importStar(require("cache-manager-redis-store"));
const Joi = __importStar(require("joi"));
const core_1 = require("@nestjs/core");
const database_module_1 = require("./database/database.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./modules/users/users.module");
const web_socket_listener_1 = __importDefault(require("./web-socket/web-socket.listener"));
const nfts_module_1 = require("./modules/nfts/nfts.module");
const init_listener_1 = __importDefault(require("./web-socket/listener/init.listener"));
const nft_created_listener_1 = __importDefault(require("./web-socket/listener/nft-created.listener"));
const nfts_service_1 = require("./modules/nfts/nfts.service");
const nfts_repository_1 = require("./modules/nfts/nfts.repository");
const users_repository_1 = require("./modules/users/users.repository");
const providers = [
    app_service_1.AppService,
    web_socket_listener_1.default,
    init_listener_1.default,
    nft_created_listener_1.default,
    nfts_service_1.NftsService,
    nfts_repository_1.NftRepository,
    users_repository_1.UsersRepository,
];
if (process.env.NODE_EN === 'production') {
    providers.push({
        provide: core_1.APP_INTERCEPTOR,
        useClass: common_1.CacheInterceptor,
    });
}
console.log(process.env.REDIS_HOST, ' | ', process.env.REDIS_PORT, ' | ', process.env.REDIS_PASS);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            common_1.CacheModule.register({
                store: redisStore,
                host: 'ec2-34-200-100-197.compute-1.amazonaws.com',
                port: process.env.REDIS_PORT || 6379,
                auth_pass: process.env.REDIS_PASS || '',
                db: 0,
                ttl: 600
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                validationSchema: Joi.object({
                    PORT: Joi.number().default(4000),
                    NODE_ENV: Joi.string().default('development'),
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_PORT: Joi.number().required(),
                    POSTGRES_USER: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    POSTGRES_DB: Joi.string().required(),
                    CHAIN_WEB_SOCKET_URL: Joi.string().required(),
                    CHAIN_ID: Joi.number().required(),
                    MINT_CONTRACT_ADDRESS: Joi.string().required(),
                    DEPLOYER_ADDRESS: Joi.string().required(),
                    SUBGRAPH_GRAPHQL_ENDPOINT: Joi.string().required(),
                    WEB3_NODE_RPC: Joi.string().required(),
                }),
            }),
            schedule_1.ScheduleModule.forRoot(),
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            nfts_module_1.NftsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers,
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map