import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateProtocolDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @ApiProperty()
  chain: string[]

  @IsNotEmpty()
  @ApiProperty()
  link: string

  @IsOptional()
  @ApiPropertyOptional()
  description: string
}
