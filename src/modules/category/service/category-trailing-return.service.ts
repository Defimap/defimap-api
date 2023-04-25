import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import dayjs from 'dayjs'

import { CategoryTrailingReturn } from 'src/entities/category-trailing-return.entity'
import { QueryCategoryTrailingReturnDto } from '../dto/query.dto'

@Injectable()
export class CategoryTrailingReturnService {
  private readonly logger = new Logger(CategoryTrailingReturnService.name)

  constructor(
    @InjectRepository(CategoryTrailingReturn)
    private readonly categoryTrailingReturnRepository: Repository<CategoryTrailingReturn>,
  ) {}

  async findAll(query: QueryCategoryTrailingReturnDto) {
    const categoryTotalReturn = this.categoryTrailingReturnRepository.createQueryBuilder('categoryTrailingReturn')

    if (query?.period) {
      categoryTotalReturn.andWhere('categoryTrailingReturn.period = :period', {
        period: query.period,
      })
    }

    if (query?.date) {
      categoryTotalReturn.andWhere('categoryTrailingReturn.date = :date', {
        date: dayjs(query.date).startOf('day'),
      })
    }

    if (query?.categoryId) {
      categoryTotalReturn.andWhere('categoryTrailingReturn.categoryId = :categoryId', {
        categoryId: query.categoryId,
      })
    }

    return categoryTotalReturn.getMany()
  }

  async findById(id: string) {
    const categoryTotalReturn = this.categoryTrailingReturnRepository.createQueryBuilder().where('id = :id', { id })
    return categoryTotalReturn.getOne()
  }
}
