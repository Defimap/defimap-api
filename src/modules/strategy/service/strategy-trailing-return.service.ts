import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import dayjs from 'dayjs'

import { QueryStrategyTailingReturnDto } from '../dto/query.dto'
import { StrategyTrailingReturn } from 'src/entities/strategy-trailing-return.entity'

@Injectable()
export class StrategyTrailingReturnService {
  private readonly logger = new Logger(StrategyTrailingReturnService.name)

  constructor(
    @InjectRepository(StrategyTrailingReturn)
    private readonly strategyTrailingReturnRepository: Repository<StrategyTrailingReturn>,
  ) {}

  async findAll(query: QueryStrategyTailingReturnDto) {
    const strategyTrailingReturn = this.strategyTrailingReturnRepository.createQueryBuilder('strategyTrailingReturn')

    if (query?.period) {
      strategyTrailingReturn.andWhere('strategyTrailingReturn.period = :period', {
        period: query.period,
      })
    }

    if (query?.date) {
      strategyTrailingReturn.andWhere('strategyTrailingReturn.date = :date', {
        date: dayjs(query.date).startOf('day'),
      })
    }

    if (query?.strategyId) {
      strategyTrailingReturn.andWhere('strategyTrailingReturn.strategyId = :strategyId', {
        strategyId: query.strategyId,
      })
    }

    return strategyTrailingReturn.getMany()
  }

  async findById(id: string) {
    const strategyTrailingReturn = this.strategyTrailingReturnRepository.createQueryBuilder().where('id = :id', { id })
    return strategyTrailingReturn.getOne()
  }
}
