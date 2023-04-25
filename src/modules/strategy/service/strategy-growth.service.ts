import { Inject, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Repository } from 'typeorm'

import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { StrategyGrowth } from 'src/entities/strategy-growth.entity'
import { CalcGrowthServiceClient, CALC_GROWTH_SERVICE_NAME } from 'src/proto/build/calc_growth.pb'
import { QueryStrategyGrowthDto } from '../dto/query.dto'
import { StrategyCompareDto, StrategyGrowthDto, StrategyGrowthListDto } from '../dto/body.dto'
import { Strategy } from 'src/entities/strategy.entity'
import { RedisService } from 'src/modules/redis/services/redis.service'
import { getPeriod } from 'src/utils/period'

@Injectable()
export class StrategyGrowthService {
  private readonly logger = new Logger(StrategyGrowthService.name)
  private calcGrowthService: CalcGrowthServiceClient

  constructor(
    @InjectRepository(StrategyGrowth)
    private readonly strategyGrowthRepository: Repository<StrategyGrowth>,
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,

    @Inject(CALC_GROWTH_SERVICE_NAME)
    private readonly client: ClientGrpc,
    private redisService: RedisService,
  ) {}

  public onModuleInit(): void {
    this.calcGrowthService = this.client.getService<CalcGrowthServiceClient>(CALC_GROWTH_SERVICE_NAME)
  }

  async findAll(query: QueryStrategyGrowthDto) {
    const strategyGrowth = this.strategyGrowthRepository.createQueryBuilder('strategyGrowth').orderBy('date')
    this.logger.debug(dayjs(query.startDate))
    this.logger.debug(dayjs(query.endDate))

    if (query?.startDate && query?.endDate) {
      strategyGrowth.andWhere('strategyGrowth.date >= :startDate AND strategyGrowth.date <= :endDate', {
        startDate: dayjs(query.startDate),
        endDate: dayjs(query.endDate),
      })
    }

    if (query?.strategyId) {
      strategyGrowth.andWhere('strategyGrowth.strategyId = :strategyId', {
        strategyId: query.strategyId,
      })
    }

    return strategyGrowth.getMany()
  }

  async findById(id: string) {
    const strategyGrowth = this.strategyGrowthRepository.createQueryBuilder().where('id = :id', { id })

    return strategyGrowth.getOne()
  }

  async findByStrategyId(id: string) {
    const strategyGrowth = this.strategyGrowthRepository
      .createQueryBuilder('strategyGrowth')
      .where('strategyGrowth.strategyId = :id', { id })

    return strategyGrowth.getMany()
  }

  async getStrategyGrowth(body: StrategyGrowthDto) {
    const key = `${body?.strategy?.toLowerCase()}-${body?.period}`
    const result = await this.redisService.get(key)
    if (result) {
      return result
    }
    return []
  }

  async getStrategyGrowthList(body: StrategyGrowthListDto) {
    let result = []
    for await (const item of body.strategy) {
      const key = `${item?.toLowerCase()}-${body?.period}`
      const res = await this.redisService.get(key)
      result.push({
        slug: item?.toLowerCase(),
        data: res,
      })
    }

    let minLength = 366
    result?.map((item) => {
      if (minLength > item?.data?.length) {
        minLength = item?.data?.length
      }
    })

    //  NORMAL
    if (minLength === 366 && body?.period === 'one_year') {
      return { period: body?.period, data: result }
    } else if (minLength === 181 && body?.period === 'six_month') {
      return { period: body?.period, data: result }
    } else if (minLength === 91 && body?.period === 'three_month') {
      return { period: body?.period, data: result }
    } else if (minLength === 31 && body?.period === 'thirty_day') {
      return { period: body?.period, data: result }
    } else if (minLength === 8 && body?.period === 'seven_day') {
      return { period: body?.period, data: result }
    }
    const period = getPeriod(minLength)
    result = await this.getStrategyListFromCache(body.strategy, period)
    if (result?.length) {
      return { period, data: result }
    }
    return []
  }

  async getStrategyListFromCache(strategy: string[], period: string) {
    const result = []
    for await (const item of strategy) {
      const key = `${item?.toLowerCase()}-${period}`
      const res = await this.redisService.get(key)
      result.push({
        slug: item?.toLowerCase(),
        period,
        data: res,
      })
    }
    return result
  }

  async findStrategyCompare(body: StrategyCompareDto) {
    const endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    let startDate = dayjs().subtract(366, 'day').format('YYYY-MM-DD')

    switch (body?.period) {
      case 'one_year':
        startDate = dayjs().subtract(366, 'day').format('YYYY-MM-DD')
        break
      case 'six_month':
        startDate = dayjs().subtract(181, 'day').format('YYYY-MM-DD')
        break
      case 'three_month':
        startDate = dayjs().subtract(91, 'day').format('YYYY-MM-DD')
        break
      case 'thirty_day':
        startDate = dayjs().subtract(31, 'day').format('YYYY-MM-DD')
        break
      case 'seven_day':
        startDate = dayjs().subtract(8, 'day').format('YYYY-MM-DD')
        break
      default:
        break
    }
    return await this.calcGrowth(body?.initialInvestment, startDate, endDate, body.strategy)
  }

  async calcGrowth(initialInvestment: number, startDate: string, endDate: string, strategy: string) {
    this.logger.debug({ strategy, initialInvestment, startDate, endDate })
    try {
      const result = await firstValueFrom(
        this.calcGrowthService.getCalcStrategyGrowth({
          strategy,
          initialInvestment,
          startDate,
          endDate,
        }),
      )
      return result.growths
    } catch (error) {
      this.logger.error(error)
    }
  }
}
