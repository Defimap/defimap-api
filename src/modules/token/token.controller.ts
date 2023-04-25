import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { QueryTokenDto } from './dto/query.dto'
import { TokenService } from './token.service'

@ApiTags('Token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  async getAll(@Res() res: Response, @Query() query: QueryTokenDto) {
    const result = await this.tokenService.findAll(query)
    return res.status(HttpStatus.OK).send(result)
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param('id') id: string) {
    const result = await this.tokenService.findById(id)
    return res.status(HttpStatus.OK).send(result)
  }
}
