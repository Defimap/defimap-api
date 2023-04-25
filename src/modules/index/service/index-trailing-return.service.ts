import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IndexTrailingReturn } from 'src/entities/index-trailing-return.entity'
import { QueryIndexTailingReturnDto } from '../dto/query.dto'
import dayjs from 'dayjs'

@Injectable()
export class IndexTrailingReturnService {
  private readonly logger = new Logger(IndexTrailingReturnService.name)

  constructor(
    @InjectRepository(IndexTrailingReturn)
    private readonly indexTrailingReturnRepository: Repository<IndexTrailingReturn>,
  ) {}

  async findAll(query: QueryIndexTailingReturnDto) {
    const indexTrailingReturn = this.indexTrailingReturnRepository.createQueryBuilder('indexTrailingReturn')

    if (query?.period) {
      indexTrailingReturn.andWhere('indexTrailingReturn.period = :period', {
        period: query.period,
      })
    }

    if (query?.date) {
      indexTrailingReturn.andWhere('indexTrailingReturn.date = :date', {
        date: dayjs(query.date).startOf('day'),
      })
    }

    if (query?.indexId) {
      indexTrailingReturn.andWhere('indexTrailingReturn.indexId = :indexId', {
        indexId: query.indexId,
      })
    }

    return indexTrailingReturn.getMany()
  }

  async findById(id: string) {
    const indexTrailingReturn = this.indexTrailingReturnRepository.createQueryBuilder().where('id = :id', { id })
    return indexTrailingReturn.getOne()
  }
}
