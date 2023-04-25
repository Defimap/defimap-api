import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsIn, IsLowercase, IsNotEmpty, IsNumber, Min } from 'class-validator'
import dayjs from 'dayjs'

export class BodyStrategyCalcGrowthDto {
  @IsNotEmpty()
  @ApiProperty({ default: 50000 })
  @IsNumber()
  @Min(1)
  initialInvestment: number

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: '2022-01-01' })
  startDate: string

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ default: dayjs().subtract(1, 'days').format('YYYY-MM-DD') })
  endDate: string

  // strategy slug
  // for GetCalcStrategyGrowth
  @IsNotEmpty()
  @ApiProperty({ default: 'aave_aave' })
  strategy: string

  // category slug
  // for GetCalcCategoryGrowth
  @IsNotEmpty()
  @ApiProperty({ default: 'lending' })
  @IsLowercase()
  @IsIn(['lending', 'staking', 'vault', 'stablecoins', 'leverage', 'liquidity_pool', 'delta_neutral'])
  category: string

  // lowercase token name
  // for GetCalcIndexGrowth
  @IsNotEmpty()
  @ApiProperty({ default: 'aave' })
  indexToken: string
}

export class StrategyGrowthDto {
  @IsNotEmpty()
  @ApiProperty({ default: 10000 })
  @IsNumber()
  @Min(1)
  initialInvestment: number

  @IsNotEmpty()
  @ApiProperty({ default: 'one_year' })
  period: 'one_year' | 'six_month' | 'three_month' | 'thirty_day' | 'seven_day'

  @IsNotEmpty()
  @ApiProperty({ default: 'aave_aave' })
  strategy: string
}

export class StrategyGrowthListDto {
  @IsNotEmpty()
  @ApiProperty({ default: 10000 })
  @IsNumber()
  @Min(1)
  initialInvestment: number

  @IsNotEmpty()
  @ApiProperty({ default: 'one_year' })
  period: 'one_year' | 'six_month' | 'three_month' | 'thirty_day' | 'seven_day'

  @IsNotEmpty()
  @ApiProperty({ default: ['aave_aave', 'comp_usdc', 'aave_link', 'comp_eth'] })
  strategy: string[]
}

export class StrategyCompareDto {
  @IsNotEmpty()
  @ApiProperty({ default: 10000 })
  @IsNumber()
  @Min(1)
  initialInvestment: number

  @IsNotEmpty()
  @ApiProperty({ default: '2022-01-01' })
  period: 'one_year' | 'six_month' | 'three_month' | 'thirty_day' | 'seven_day'

  @IsNotEmpty()
  @ApiProperty({ default: 'aave_aave' })
  strategy: string
}
