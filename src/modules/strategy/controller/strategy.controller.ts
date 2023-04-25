import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { BodyStrategyCalcGrowthDto } from '../dto/body.dto'
import { QueryRiskAndVolatilityDto, QueryStrategyDto } from '../dto/query.dto'
import { StrategyService } from '../service/strategy.service'

@ApiTags('Strategy')
@Controller('strategy')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Post()
  async getAll(@Res() res: Response, @Body() body: QueryStrategyDto) {
    const result = await this.strategyService.findAll(body)
    return res.status(HttpStatus.OK).send(result)
  }

  @Get('/sitemap')
  async getSitemap(@Res() res: Response) {
    const result = await this.strategyService.getSitemap()
    return res.status(HttpStatus.OK).send(result)
  }

  @Get(':slug')
  async getBySlug(@Res() res: Response, @Param('slug') slug: string) {
    const result = await this.strategyService.findBySlug(slug)
    if (result) {
      return res.status(HttpStatus.OK).send(result)
    }
    return res.status(HttpStatus.NOT_FOUND).send({ message: `not found ${slug}` })
  }

  @Get('/:slug/performance')
  async getPerformance(@Res() res: Response, @Param('slug') slug: string) {
    const result = await this.strategyService.getPerformance(slug)
    return res.status(HttpStatus.OK).send(result)
  }

  @Get('/:slug/risk-and-volatility')
  async getRiskAndVolatility(
    @Res() res: Response,
    @Param('slug') slug: string,
    @Query() query: QueryRiskAndVolatilityDto,
  ) {
    const result = await this.strategyService.getRiskAndVolatility(slug, query)
    return res.status(HttpStatus.OK).send(result)
  }

  @Get('/:slug/liquidity')
  async getLiquidity(@Res() res: Response, @Param('slug') slug: string) {
    const result = await this.strategyService.getLiquidity(slug)
    return res.status(HttpStatus.OK).send(result)
  }

  @Post('/calc-growth')
  async calcGrowth(@Res() res: Response, @Body() body: BodyStrategyCalcGrowthDto) {
    const result = await this.strategyService.calcGrowth(body)
    return res.status(HttpStatus.OK).send(result)
  }
}
