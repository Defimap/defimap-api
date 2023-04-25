import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

import { Period } from 'src/models/period'

export class QueryCategoryGrowthDto {
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  endDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  categoryId: string

  @IsNotEmpty()
  @ApiProperty()
  date: Date | string
}

export class QueryCategoryTotalReturnDto {
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  endDate: Date | string

  @IsNotEmpty()
  @ApiProperty()
  categoryId: string

  @IsNotEmpty()
  @ApiProperty()
  date: Date | string
}

export class QueryCategoryTrailingReturnDto {
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
  categoryId: string
}

export class QueryCategoryRiskAndVolatilityVolatilityDto {
  @IsOptional()
  @ApiPropertyOptional({
    enum: Period,
  })
  period?: Period

  @IsNotEmpty()
  @ApiProperty()
  categoryId: string

  @IsOptional()
  @ApiPropertyOptional()
  date?: Date | string
}
