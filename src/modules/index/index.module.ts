import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IndexGrowth } from 'src/entities/index-growth.entity'
import { IndexRiskAndVolatility } from 'src/entities/index-risk-and-volatility.entity'
import { IndexTotalReturn } from 'src/entities/index-total-return.entity'
import { IndexTrailingReturn } from 'src/entities/index-trailing-return.entity'
import { Index } from 'src/entities/index.entity'
import { CALC_GROWTH_PACKAGE_NAME, CALC_GROWTH_SERVICE_NAME } from 'src/proto/build/calc_growth.pb'

import { ChannelCredentials } from '@grpc/grpc-js'
import { ConfigModule } from '@nestjs/config'
import { IndexGrowthService } from './service/index-growth.service'
import { IndexRiskAndVolatilityService } from './service/index-risk-and-volatility.service'
import { IndexTotalReturnService } from './service/index-total-return.service'
import { IndexTrailingReturnService } from './service/index-trailing-return.service'
import { IndexService } from './service/index.service'
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
    TypeOrmModule.forFeature([Index, IndexGrowth, IndexTotalReturn, IndexTrailingReturn, IndexRiskAndVolatility]),
  ],
  providers: [
    IndexService,
    IndexGrowthService,
    IndexTotalReturnService,
    IndexTrailingReturnService,
    IndexRiskAndVolatilityService,
  ],
  exports: [
    IndexService,
    IndexGrowthService,
    IndexTotalReturnService,
    IndexTrailingReturnService,
    IndexRiskAndVolatilityService,
  ],
})
export class IndexModule {}
