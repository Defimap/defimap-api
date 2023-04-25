import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Chain } from 'src/entities/chain.entity'
import { CreateChainDto } from './dto/create.dto'
import { QueryChainDto } from './dto/query.dto'

@Injectable()
export class ChainService {
  private readonly logger = new Logger(ChainService.name)

  constructor(
    @InjectRepository(Chain)
    private readonly chainRepository: Repository<Chain>,
  ) {}

  async findAll(query: QueryChainDto) {
    const chain = this.chainRepository
      .createQueryBuilder('chain')
      .select(['chain.id', 'chain.name', 'chain.logo', 'chain.networkId'])

    if (query?.name) {
      chain.andWhere('LOWER(chain.name) LIKE LOWER(:name)', { name: `%${query.name}%` })
    }

    return chain.getMany()
  }

  async findById(id: string) {
    const chain = this.chainRepository.createQueryBuilder('chain').where('chain.id = :id', { id })
    return chain.getOne()
  }

  async findByNetworkId(networkId: number) {
    const chain = this.chainRepository.createQueryBuilder('chain').where('chain.networkId = :networkId', { networkId })
    return chain.getOne()
  }

  async create(payload: CreateChainDto) {
    const chain = new Chain()
    chain.name = payload.name
    chain.networkId = payload.networkId

    const result = await this.chainRepository.save(chain)
    return result
  }
}
