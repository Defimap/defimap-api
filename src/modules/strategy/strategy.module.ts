import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { StrategyGrowth } from 'src/entities/strategy-growth.entity'
import { StrategyTotalReturn } from 'src/entities/strategy-total-return.entity'
import { StrategyTrailingReturn } from 'src/entities/strategy-trailing-return.entity'
import { Strategy } from 'src/entities/strategy.entity'
import { StrategyCategory } from 'src/entities/strategy-category.entity'
import { CategoryModule } from '../category/category.module'
import { IndexModule } from '../index/index.module'

import { StrategyController } from './controller/strategy.controller'
import { StrategyTrailingReturnService } from './service/strategy-trailing-return.service'

import { ChannelCredentials } from '@grpc/grpc-js'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { StrategyRiskAndVolatility } from 'src/entities/strategy-risk-and-volatility.entity'
import { StrategyTVL } from 'src/entities/strategy-tvl.entity'
import { CALC_GROWTH_PACKAGE_NAME, CALC_GROWTH_SERVICE_NAME } from 'src/proto/build/calc_growth.pb'
import { StrategyGrowthService } from './service/strategy-growth.service'
import { StrategyLiquidityService } from './service/strategy-liquidity.service'
import { StrategyRiskAndVolatilityService } from './service/strategy-risk-and-volatility.service'
import { StrategyTotalReturnService } from './service/strategy-total-return.service'
import { StrategyService } from './service/strategy.service'
import { StrategyGrowthController } from './controller/strategy-growth.controller'
import { RedisService } from '../redis/services/redis.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: CALC_GROWTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.CALC_GROWTH_HOST}:${process.env.CALC_GROWTH_PORT}`,
          package: CALC_GROWTH_PACKAGE_NAME,
          protoPath: 'src/proto/calc_growth.proto',
          credentials: ChannelCredentials.createSsl(),
        },
      },
    ]),
    TypeOrmModule.forFeature([
      Strategy,
      StrategyGrowth,
      StrategyTotalReturn,
      StrategyTrailingReturn,
      StrategyRiskAndVolatility,
      StrategyTVL,
      StrategyCategory,
    ]),
    IndexModule,
    CategoryModule,
  ],
  controllers: [StrategyController, StrategyGrowthController],
  providers: [
    StrategyService,
    StrategyGrowthService,
    StrategyTotalReturnService,
    StrategyTrailingReturnService,
    StrategyRiskAndVolatilityService,
    StrategyLiquidityService,
    RedisService,
  ],
  exports: [
    StrategyService,
    StrategyGrowthService,
    StrategyTotalReturnService,
    StrategyTrailingReturnService,
    StrategyRiskAndVolatilityService,
    RedisService,
  ],
})
export class StrategyModule {}
