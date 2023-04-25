import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { Period } from 'src/models/period'

export class CreateIndexDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string
}

export class CreateIndexGrowthDto {
  @IsNotEmpty()
  @ApiProperty()
  value: number

  @IsNotEmpty()
  @ApiProperty()
  date: Date

  @IsNotEmpty()
  @ApiProperty()
  indexId: string
}

export class CreateIndexTotalReturnDto {
  @IsNotEmpty()
  @ApiProperty()
  value: number

  @IsNotEmpty()
  @ApiProperty()
  date: Date

  @IsNotEmpty()
  @ApiProperty()
  indexId: string
}

export class CreateIndexTailingReturnDto {
  @IsNotEmpty()
  @ApiProperty()
  value: number

  @IsNotEmpty()
  @ApiProperty({
    enum: Period,
    example: Period.ONE_DAY,
  })
  period: Period

  @IsNotEmpty()
  @ApiProperty()
  indexId: string
}

export class CreateIndexRiskAndVolatilityDto {
  @IsNotEmpty()
  @ApiProperty()
  alpha: number

  @IsNotEmpty()
  @ApiProperty()
  beta: number

  @IsNotEmpty()
  @ApiProperty()
  rSquare: number

  @IsNotEmpty()
  @ApiProperty()
  sharpe: number

  @IsNotEmpty()
  @ApiProperty()
  sd: number

  @IsNotEmpty()
  @ApiProperty({
    enum: Period,
    example: Period.ONE_DAY,
  })
  period: Period

  @IsNotEmpty()
  @ApiProperty()
  indexId: string
}
