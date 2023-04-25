import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QueryCategoryRiskAndVolatilityVolatilityDto } from '../dto/query.dto'
import { CategoryRiskAndVolatility } from 'src/entities/category-risk-and-volatility.entity'

@Injectable()
export class CategoryRiskAndVolatilityService {
  private readonly logger = new Logger(CategoryRiskAndVolatilityService.name)

  constructor(
    @InjectRepository(CategoryRiskAndVolatility)
    private readonly categoryRiskAndVolatilityRepository: Repository<CategoryRiskAndVolatility>,
  ) {}

  async findAll(query: QueryCategoryRiskAndVolatilityVolatilityDto) {
    const data = this.categoryRiskAndVolatilityRepository.createQueryBuilder('categoryRiskAndVolatility')

    if (query?.period) {
      data.andWhere('categoryRiskAndVolatility.period = :period', {
        period: query.period,
      })
    }

    if (query?.categoryId) {
      data.andWhere('categoryRiskAndVolatility.categoryId = :categoryId', {
        categoryId: query.categoryId,
      })
    }

    if (query?.date) {
      data.andWhere('categoryRiskAndVolatility.date = :date', {
        date: query.date,
      })
    }

    return data.getMany()
  }

  async findById(id: string) {
    const data = this.categoryRiskAndVolatilityRepository.createQueryBuilder().where('id = :id', { id })
    return data.getOne()
  }
}
