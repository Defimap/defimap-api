import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { StrategyGrowthService } from '../service/strategy-growth.service'
import { StrategyGrowthDto, StrategyGrowthListDto } from '../dto/body.dto'

@ApiTags('Strategy Growth')
@Controller('strategy-growth')
export class StrategyGrowthController {
  constructor(private readonly strategyGrowthService: StrategyGrowthService) {}

  @Post('/compare')
  async getCompare(@Res() res: Response, @Body() body: StrategyGrowthDto) {
    const result = await this.strategyGrowthService.getStrategyGrowth(body)
    if (result) {
      return res.status(HttpStatus.OK).send(result)
    }
    return res.status(HttpStatus.NOT_FOUND).send({ message: `not found ${body?.strategy}` })
  }

  @Post('/compare-list')
  async getCompareList(@Res() res: Response, @Body() body: StrategyGrowthListDto) {
    const result = await this.strategyGrowthService.getStrategyGrowthList(body)
    return res.status(HttpStatus.OK).send(result)
  }
}
