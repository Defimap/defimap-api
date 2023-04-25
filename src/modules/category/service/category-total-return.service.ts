import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import dayjs from 'dayjs'

import { CategoryTotalReturn } from 'src/entities/category-total-return.entity'
import { QueryCategoryTotalReturnDto } from '../dto/query.dto'

@Injectable()
export class CategoryTotalReturnService {
  private readonly logger = new Logger(CategoryTotalReturnService.name)

  constructor(
    @InjectRepository(CategoryTotalReturn)
    private readonly categoryTotalReturnRepository: Repository<CategoryTotalReturn>,
  ) {}

  async findAll(query: QueryCategoryTotalReturnDto) {
    const categoryTotalReturn = this.categoryTotalReturnRepository
      .createQueryBuilder('categoryTotalReturn')
      .orderBy('date')

    if (query?.startDate && query?.endDate) {
      categoryTotalReturn.andWhere('categoryTotalReturn.date >= :startDate AND categoryTotalReturn.date <= :endDate', {
        startDate: dayjs(query.startDate).startOf('date'),
        endDate: dayjs(query.endDate).endOf('date'),
      })
    }

    if (query?.categoryId) {
      categoryTotalReturn.andWhere('categoryTotalReturn.categoryId = :categoryId', {
        categoryId: query.categoryId,
      })
    }

    return categoryTotalReturn.getMany()
  }

  async findById(id: string) {
    const categoryTotalReturn = this.categoryTotalReturnRepository.createQueryBuilder().where('id = :id', { id })
    return categoryTotalReturn.getOne()
  }
}
