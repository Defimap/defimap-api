import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { QueryProtocolDto } from './dto/query.dto'
import { ProtocolService } from './protocol.service'

@ApiTags('Protocol')
@Controller('protocol')
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  @Get()
  async getAll(@Res() res: Response, @Query() query: QueryProtocolDto) {
    const result = await this.protocolService.findAll(query)
    return res.status(HttpStatus.OK).send(result)
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param('id') id: string) {
    const result = await this.protocolService.findById(id)
    return res.status(HttpStatus.OK).send(result)
  }
}
