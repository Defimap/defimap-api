import { IsNotEmpty } from 'class-validator'
import { BetaUser } from 'src/entities/beta-user.entity'

export class CreateBetaUserResponseDto {
  @IsNotEmpty()
  data: BetaUser
}
