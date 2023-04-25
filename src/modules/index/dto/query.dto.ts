import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { Period } from 'src/models/period'

export class QueryIndexGrowthDto {
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  endDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  indexId: string

  @IsNotEmpty()
  @ApiProperty()
  date: Date | string
}

export class QueryIndexTotalReturnDto {
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  endDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  indexId: string

  @IsNotEmpty()
  @ApiProperty()
  date: Date | string
}

export class QueryIndexTailingReturnDto {
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
  indexId: string
}

export class QueryIndexRiskAndVolatilityVolatilityDto {
  @IsOptional()
  @ApiPropertyOptional({
    enum: Period,
  })
  period?: Period

  @IsNotEmpty()
  @ApiProperty()
  indexId: string

  @IsOptional()
  @ApiPropertyOptional()
  date?: Date | string
}
