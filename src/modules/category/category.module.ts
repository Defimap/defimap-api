import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelCredentials } from '@grpc/grpc-js'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

// ENTITY
import { CategoryGrowth } from 'src/entities/category-growth.entity'
import { CategoryTotalReturn } from 'src/entities/category-total-return.entity'
import { CategoryTrailingReturn } from 'src/entities/category-trailing-return.entity'
import { Category } from 'src/entities/category.entity'
import { CategoryRiskAndVolatility } from 'src/entities/category-risk-and-volatility.entity'

// CONTROLLER

// SERVICE
import { CategoryGrowthService } from './service/category-growth.service'
import { CategoryRiskAndVolatilityService } from './service/category-risk-and-volatility.service'
import { CategoryTotalReturnService } from './service/category-total-return.service'
import { CategoryTrailingReturnService } from './service/category-trailing-return.service'
import { CategoryService } from './service/category.service'

import { CALC_GROWTH_PACKAGE_NAME, CALC_GROWTH_SERVICE_NAME } from 'src/proto/build/calc_growth.pb'

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
      Category,
      CategoryGrowth,
      CategoryTotalReturn,
      CategoryTrailingReturn,
      CategoryRiskAndVolatility,
    ]),
  ],
  providers: [
    CategoryService,
    CategoryGrowthService,
    CategoryTotalReturnService,
    CategoryTrailingReturnService,
    CategoryRiskAndVolatilityService,
  ],
  exports: [
    CategoryService,
    CategoryGrowthService,
    CategoryTotalReturnService,
    CategoryTrailingReturnService,
    CategoryRiskAndVolatilityService,
  ],
})
export class CategoryModule {}
