import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { MailService } from 'src/modules/gateways/mail/mail.service'
import { CreateBetaUserRequestDto } from '../dto/request/create.request.dto'
import { CreateBetaUserResponseDto } from '../dto/response/create.response.dto'
import { BetaUserService } from '../service/beta-user.service'

@ApiTags('Beta User')
@Controller('beta-user')
export class BetaUserController {
  constructor(private readonly betaUserService: BetaUserService, private readonly mailService: MailService) {}

  @Post()
  async create(@Res() res: Response, @Body() body: CreateBetaUserRequestDto) {
    const result = await this.betaUserService.create(body)
    const response: CreateBetaUserResponseDto = { data: result }
    this.mailService.sendMailBetaUser(body?.email)

    return res.status(HttpStatus.OK).json(response)
  }
}
