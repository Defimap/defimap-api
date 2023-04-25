import { QueryIndexTotalReturnDto } from './../dto/query.dto'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import dayjs from 'dayjs'

import { IndexTotalReturn } from 'src/entities/index-total-return.entity'

@Injectable()
export class IndexTotalReturnService {
  private readonly logger = new Logger(IndexTotalReturnService.name)

  constructor(
    @InjectRepository(IndexTotalReturn)
    private readonly indexTotalReturnRepository: Repository<IndexTotalReturn>,
  ) {}

  async findAll(query: QueryIndexTotalReturnDto) {
    const indexTotalReturn = this.indexTotalReturnRepository.createQueryBuilder('indexTotalReturn').orderBy('date')
    this.logger.debug(dayjs(query.startDate).startOf('month'))
    this.logger.debug(dayjs(query.endDate).endOf('month'))

    if (query?.startDate && query?.endDate) {
      indexTotalReturn.andWhere('indexTotalReturn.date >= :startDate AND indexTotalReturn.date <= :endDate', {
        startDate: dayjs(query.startDate).startOf('month'),
        endDate: dayjs(query.endDate).endOf('month'),
      })
    }

    if (query?.indexId) {
      indexTotalReturn.andWhere('indexTotalReturn.indexId = :indexId', {
        indexId: query.indexId,
      })
    }

    return indexTotalReturn.getMany()
  }

  async findById(id: string) {
    const indexTotalReturn = this.indexTotalReturnRepository.createQueryBuilder().where('id = :id', { id })
    return indexTotalReturn.getOne()
  }
}
