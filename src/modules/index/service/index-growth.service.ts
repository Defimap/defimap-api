import { Inject, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Repository } from 'typeorm'

import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { IndexGrowth } from 'src/entities/index-growth.entity'
import { CalcGrowthServiceClient, CALC_GROWTH_SERVICE_NAME } from 'src/proto/build/calc_growth.pb'
import { QueryIndexGrowthDto } from '../dto/query.dto'

@Injectable()
export class IndexGrowthService {
  private readonly logger = new Logger(IndexGrowthService.name)
  private calcGrowthService: CalcGrowthServiceClient
  constructor(
    @InjectRepository(IndexGrowth)
    private readonly indexGrowthRepository: Repository<IndexGrowth>,

    @Inject(CALC_GROWTH_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  public onModuleInit(): void {
    this.calcGrowthService = this.client.getService<CalcGrowthServiceClient>(CALC_GROWTH_SERVICE_NAME)
  }

  async findAll(query: QueryIndexGrowthDto) {
    const indexGrowth = this.indexGrowthRepository.createQueryBuilder('indexGrowth').orderBy('date')
    indexGrowth.andWhere('indexGrowth.indexId = :indexId', {
      indexId: query.indexId,
    })

    this.logger.debug(dayjs(query.startDate))
    this.logger.debug(dayjs(query.endDate))

    if (query?.startDate && query?.endDate) {
      indexGrowth.andWhere('indexGrowth.date >= :startDate AND indexGrowth.date <= :endDate', {
        startDate: dayjs(query.startDate),
        endDate: dayjs(query.endDate),
      })
    }

    return indexGrowth.getMany()
  }

  async findById(id: string) {
    const indexGrowth = this.indexGrowthRepository.createQueryBuilder().where('id = :id', { id })
    return indexGrowth.getOne()
  }

  async calcGrowth(initialInvestment: number, startDate: string, endDate: string, indexToken: string) {
    const result = await firstValueFrom(
      this.calcGrowthService.getCalcIndexGrowth({
        token: indexToken,
        initialInvestment,
        startDate,
        endDate,
      }),
    )

    return result.growths
  }
}
