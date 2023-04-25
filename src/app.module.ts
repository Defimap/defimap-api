import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import * as redisStore from 'cache-manager-redis-store'

import { generalConfig } from 'src/config/general.config'
import { CategoryModule } from 'src/modules/category/category.module'
import { ChainModule } from 'src/modules/chain/chain.module'
import { IndexModule } from 'src/modules/index/index.module'
import { ProtocolModule } from 'src/modules/protocol/protocol.module'
import { StrategyModule } from 'src/modules/strategy/strategy.module'
import { TokenModule } from 'src/modules/token/token.module'
import { BetaUserModule } from './modules/beta-user/beta-user.module'
import { MailModule } from './modules/gateways/mail/mail.module'
import { RedisModule } from './modules/redis/redis.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [generalConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('defaultDBOptions.host'),
        username: configService.get('defaultDBOptions.username'),
        password: configService.get('defaultDBOptions.password'),
        database: configService.get('defaultDBOptions.dbName'),
        port: configService.get('defaultDBOptions.port'),
        synchronize: false,
        // logging: true,
        entities: [join(__dirname, '/entities/**/*{.ts,.js}')],
        migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          store: redisStore,
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          auth_pass: configService.get('redis.authPass'),
          ttl: +configService.get('redis.ttl'),
        } as CacheQueryOptions),
    }),
    RedisModule,
    StrategyModule,
    ChainModule,
    ProtocolModule,
    TokenModule,
    CategoryModule,
    IndexModule,
    BetaUserModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
