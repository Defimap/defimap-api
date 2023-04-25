import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Index } from 'src/entities/index.entity'

@Injectable()
export class IndexService {
  private readonly logger = new Logger(IndexService.name)

  constructor(
    @InjectRepository(Index)
    private readonly indexRepository: Repository<Index>,
  ) {}

  async findAll() {
    const index = this.indexRepository.createQueryBuilder('index')
    return index.getMany()
  }

  async findById(id: string) {
    const index = this.indexRepository
      .createQueryBuilder('index')
      .leftJoinAndSelect('index.indexGrowth', 'indexGrowth')
      .leftJoinAndSelect('index.indexTotalReturn', 'indexTotalReturn')
      .leftJoinAndSelect('index.indexTrailingReturn', 'indexTrailingReturn')
      .leftJoinAndSelect('index.indexRiskAndVolatility', 'indexRiskAndVolatility')
      .where('index.id = :id', { id })
    return index.getOne()
  }

  async create(payload) {
    const index = new Index()
    index.name = payload.name

    const result = await this.indexRepository.save(index)
    return result
  }
}
