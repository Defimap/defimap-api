import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QueryStrategyRiskAndVolatilityDto } from '../dto/query.dto'
import { StrategyRiskAndVolatility } from 'src/entities/strategy-risk-and-volatility.entity'

@Injectable()
export class StrategyRiskAndVolatilityService {
  private readonly logger = new Logger(StrategyRiskAndVolatilityService.name)

  constructor(
    @InjectRepository(StrategyRiskAndVolatility)
    private readonly strategyRiskAndVolatilityRepository: Repository<StrategyRiskAndVolatility>,
  ) {}

  async findAll(query: QueryStrategyRiskAndVolatilityDto) {
    const data = this.strategyRiskAndVolatilityRepository.createQueryBuilder('strategy')

    if (query?.period) {
      data.andWhere('strategy.period = :period', {
        period: query.period,
      })
    }

    if (query?.strategyId) {
      data.andWhere('strategy.strategyId = :strategyId', {
        strategyId: query.strategyId,
      })
    }

    if (query?.date) {
      data.andWhere('strategy.date = :date', {
        date: query.date,
      })
    }

    return data.getMany()
  }

  async findById(id: string) {
    const data = this.strategyRiskAndVolatilityRepository.createQueryBuilder().where('id = :id', { id })
    return data.getOne()
  }
}
