import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class QueryTokenDto {
  @IsOptional()
  @ApiPropertyOptional()
  chainId: string

  @IsOptional()
  @ApiPropertyOptional({
    default: 50,
  })
  limit: number

  @IsOptional()
  @ApiPropertyOptional({
    default: 1,
  })
  page: number

  @IsOptional()
  @ApiPropertyOptional()
  name: string
}
