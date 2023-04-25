import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { Order } from 'src/models/order'
import { Period } from 'src/models/period'

export class QueryStrategyDto {
  @IsOptional()
  @ApiPropertyOptional({
    default: 10,
  })
  limit: number

  @IsOptional()
  @ApiPropertyOptional({
    default: 1,
  })
  page: number

  @IsOptional()
  @ApiPropertyOptional({
    default: '',
  })
  name: string

  @IsOptional()
  @ApiPropertyOptional({
    default: ['3246aa63-a922-4461-b526-5ea62bba8fa2'],
  })
  protocolIds: string[]

  @IsOptional()
  @ApiPropertyOptional({
    default: ['6d793fe6-4a66-4324-8c48-b1b5715c3f06'],
  })
  chainIds: string[]

  @IsOptional()
  @ApiPropertyOptional({
    default: ['d48fb82e-7184-4584-8eb8-71430cfd5b0f'],
  })
  categoryIds: string[]

  @IsOptional()
  @ApiPropertyOptional({
    default: ['812f9ad7-94e5-461f-8574-8fbb65d748c2'],
  })
  supplyTokenIds: string[]

  @IsOptional()
  @ApiPropertyOptional({
    default: ['812f9ad7-94e5-461f-8574-8fbb65d748c2'],
  })
  rewardTokenIds: string[]

  @IsOptional()
  @ApiPropertyOptional({
    default: {
      min: 0,
      max: 1000000000,
    },
  })
  tvl: {
    min: number
    max: number
  }

  @IsOptional()
  @ApiPropertyOptional({
    default: {
      min: -100,
      max: 100,
    },
  })
  oneYearReturn: {
    min: number
    max: number
  }

  @IsOptional()
  @ApiPropertyOptional({
    default: 'name',
  })
  sortBy: string

  @IsOptional()
  @ApiPropertyOptional({
    enum: Order,
    default: Order.ASC,
  })
  order: Order.ASC

  @IsOptional()
  @ApiPropertyOptional({ default: true })
  publish: boolean
}

export class QueryStrategyGrowthDto {
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  endDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  strategyId: string

  @IsNotEmpty()
  @ApiProperty()
  date: Date | string
}

export class QueryStrategyTotalReturnDto {
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  endDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  strategyId: string

  @IsNotEmpty()
  @ApiProperty()
  date: Date | string
}

export class QueryStrategyTailingReturnDto {
  @IsOptional()
  @ApiPropertyOptional()
  date?: Date | string

  @IsOptional()
  @ApiPropertyOptional({
    enum: Period,
  })
  period?: Period

  @IsNotEmpty()
  @ApiProperty()
  strategyId: string
}

export class QueryRiskAndVolatilityDto {
  @IsOptional()
  @ApiPropertyOptional({
    enum: Period,
  })
  period?: Period
}

export class QueryStrategyRiskAndVolatilityDto {
  @IsOptional()
  @ApiPropertyOptional({
    enum: Period,
  })
  period?: Period

  @IsNotEmpty()
  @ApiProperty()
  strategyId: string

  @IsOptional()
  @ApiPropertyOptional()
  date?: Date | string
}

export class QueryStrategyLiquidityDto {
  @IsNotEmpty()
  @ApiProperty()
  strategyId: string
}
