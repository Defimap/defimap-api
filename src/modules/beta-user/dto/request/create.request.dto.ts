import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateBetaUserRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsOptional()
  @ApiPropertyOptional()
  feature: string

  @IsOptional()
  @ApiPropertyOptional()
  pricingOption: string
}
