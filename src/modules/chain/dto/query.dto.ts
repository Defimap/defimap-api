import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class QueryChainDto {
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
