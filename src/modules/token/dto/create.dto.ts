import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @ApiProperty()
  symbol: string

  @IsNotEmpty()
  @ApiProperty()
  address: string

  @IsNotEmpty()
  @ApiProperty()
  chainId: string

  @IsNotEmpty()
  @ApiProperty()
  logo: string

  @IsOptional()
  @ApiPropertyOptional()
  description: string[]

  @IsOptional()
  @ApiPropertyOptional()
  link: string
}
