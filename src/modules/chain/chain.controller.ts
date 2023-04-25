import { QueryChainDto } from './dto/query.dto'
import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ChainService } from './chain.service'

@ApiTags('Chain')
@Controller('chain')
export class ChainController {
  constructor(private readonly chainService: ChainService) {}

  @Get()
  async getAll(@Res() res: Response, @Query() query: QueryChainDto) {
    const result = await this.chainService.findAll(query)
    return res.status(HttpStatus.OK).send(result)
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param('id') id: string) {
    const result = await this.chainService.findById(id)
    return res.status(HttpStatus.OK).send(result)
  }
}
