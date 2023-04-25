import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IndexRiskAndVolatility } from 'src/entities/index-risk-and-volatility.entity'
import { QueryIndexRiskAndVolatilityVolatilityDto } from '../dto/query.dto'

@Injectable()
export class IndexRiskAndVolatilityService {
  private readonly logger = new Logger(IndexRiskAndVolatilityService.name)

  constructor(
    @InjectRepository(IndexRiskAndVolatility)
    private readonly indexRiskAndVolatilityRepository: Repository<IndexRiskAndVolatility>,
  ) {}

  async findAll(query: QueryIndexRiskAndVolatilityVolatilityDto) {
    const data = this.indexRiskAndVolatilityRepository.createQueryBuilder('index')

    if (query?.period) {
      data.andWhere('index.period = :period', {
        period: query.period,
      })
    }

    if (query?.indexId) {
      data.andWhere('index.indexId = :indexId', {
        indexId: query.indexId,
      })
    }

    if (query?.date) {
      data.andWhere('index.date = :date', {
        date: query.date,
      })
    }

    return data.getMany()
  }

  async findById(id: string) {
    const data = this.indexRiskAndVolatilityRepository.createQueryBuilder().where('id = :id', { id })
    return data.getOne()
  }
}
