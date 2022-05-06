import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import * as Joi from 'joi';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import WebSocketListener from './web-socket/web-socket.listener';
import { NftsModule } from './modules/nfts/nfts.module';
import InitListener from './web-socket/listener/init.listener';
import NftCreatedListener from './web-socket/listener/nft-created.listener';
import { NftsService } from './modules/nfts/nfts.service';
import { NftRepository } from './modules/nfts/nfts.repository';
import { UsersRepository } from './modules/users/users.repository';

const providers: any = [
  AppService,
  WebSocketListener,
  InitListener,
  NftCreatedListener,
  NftsService,
  NftRepository,
  UsersRepository,
];

if (process.env.NODE_ENV === 'production') {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  });
}

const isProd = process.env.NODE_ENV === 'production';
const redisOptions = isProd ? { url: process.env.REDIS_URL.toString() } : { host: 'localhost', port: 6379 };

console.log("HIDUDE", redisOptions);
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      ...redisOptions
    }),
    ConfigModule.forRoot({
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
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    NftsModule,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
