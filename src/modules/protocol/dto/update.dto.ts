import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateProtocolDto {
  @IsOptional()
  @ApiProperty()
  name: string

  @IsOptional()
  @ApiProperty()
  chain: string[]

  @IsNotEmpty()
  @ApiProperty()
  link: string

  @IsOptional()
  @ApiPropertyOptional()
  description: string[]
}
