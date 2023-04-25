import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateStrategyDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsOptional()
  @ApiProperty()
  apr: number

  @IsOptional()
  @ApiProperty()
  tvl: number

  @IsNotEmpty()
  @ApiProperty()
  publish: boolean

  @IsNotEmpty()
  @ApiProperty()
  categoryId: string

  @IsNotEmpty()
  @ApiProperty()
  protocolId: string

  @IsNotEmpty()
  @ApiProperty()
  chainId: string

  @IsNotEmpty()
  @ApiProperty()
  indexId: string

  @IsNotEmpty()
  @ApiProperty()
  slug: string
}
