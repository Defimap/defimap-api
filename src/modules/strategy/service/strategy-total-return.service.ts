import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import dayjs from 'dayjs'

import { StrategyTotalReturn } from 'src/entities/strategy-total-return.entity'
import { QueryStrategyTotalReturnDto } from '../dto/query.dto'

@Injectable()
export class StrategyTotalReturnService {
  private readonly logger = new Logger(StrategyTotalReturnService.name)

  constructor(
    @InjectRepository(StrategyTotalReturn)
    private readonly strategyTotalReturnRepository: Repository<StrategyTotalReturn>,
  ) {}

  async findAll(query: QueryStrategyTotalReturnDto) {
    const strategyTotalReturn = this.strategyTotalReturnRepository
      .createQueryBuilder('strategyTotalReturn')
      .orderBy('date')

    this.logger.debug(dayjs(query.startDate).startOf('month'))
    this.logger.debug(dayjs(query.endDate).endOf('month'))

    if (query?.startDate && query?.endDate) {
      strategyTotalReturn.andWhere('strategyTotalReturn.date >= :startDate AND strategyTotalReturn.date <= :endDate', {
        startDate: dayjs(query.startDate).startOf('month'),
        endDate: dayjs(query.endDate).endOf('month'),
      })
    }

    if (query?.strategyId) {
      strategyTotalReturn.andWhere('strategyTotalReturn.strategyId = :strategyId', {
        strategyId: query.strategyId,
      })
    }

    return strategyTotalReturn.getMany()
  }

  async findById(id: string) {
    const strategyTotalReturn = this.strategyTotalReturnRepository.createQueryBuilder().where('id = :id', { id })
    return strategyTotalReturn.getOne()
  }
}
