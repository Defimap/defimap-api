import { Inject, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { firstValueFrom } from 'rxjs'
import dayjs from 'dayjs'

import { CategoryGrowth } from 'src/entities/category-growth.entity'
import { ClientGrpc } from '@nestjs/microservices'
import { CalcGrowthServiceClient, CALC_GROWTH_SERVICE_NAME } from 'src/proto/build/calc_growth.pb'
import { QueryCategoryGrowthDto } from '../dto/query.dto'

@Injectable()
export class CategoryGrowthService {
  private readonly logger = new Logger(CategoryGrowthService.name)
  private calcGrowthService: CalcGrowthServiceClient

  constructor(
    @InjectRepository(CategoryGrowth)
    private readonly categoryGrowthRepository: Repository<CategoryGrowth>,

    @Inject(CALC_GROWTH_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  public onModuleInit(): void {
    this.calcGrowthService = this.client.getService<CalcGrowthServiceClient>(CALC_GROWTH_SERVICE_NAME)
  }

  async findAll(query: QueryCategoryGrowthDto) {
    const categoryGrowth = this.categoryGrowthRepository.createQueryBuilder('categoryGrowth').orderBy('date')
    this.logger.debug(dayjs(query.startDate))
    this.logger.debug(dayjs(query.endDate))

    if (query?.startDate && query?.endDate) {
      categoryGrowth.andWhere('categoryGrowth.date >= :startDate AND categoryGrowth.date <= :endDate', {
        startDate: dayjs(query.startDate),
        endDate: dayjs(query.endDate),
      })
    }

    if (query?.categoryId) {
      categoryGrowth.andWhere('categoryGrowth.categoryId = :categoryId', {
        categoryId: query.categoryId,
      })
    }

    return categoryGrowth.getMany()
  }

  async findById(id: string) {
    const categoryGrowth = this.categoryGrowthRepository.createQueryBuilder().where('id = :id', { id })
    return categoryGrowth.getOne()
  }

  async calcGrowth(initialInvestment: number, startDate: string, endDate: string, category: string) {
    const result = await firstValueFrom(
      this.calcGrowthService.getCalcCategoryGrowth({
        category,
        initialInvestment,
        startDate,
        endDate,
      }),
    )

    return result.growths
  }
}
