import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { CreateProtocolDto } from './dto/create.dto'
import { Protocol } from 'src/entities/protocol.entity'
import { Chain } from 'src/entities/chain.entity'
import { UpdateProtocolDto } from './dto/update.dto'
import { QueryProtocolDto } from './dto/query.dto'

@Injectable()
export class ProtocolService {
  private readonly logger = new Logger(ProtocolService.name)

  constructor(
    @InjectRepository(Protocol)
    private readonly protocolRepository: Repository<Protocol>,
    @InjectRepository(Chain)
    private readonly chainRepository: Repository<Chain>,
  ) {}

  async findAll(query: QueryProtocolDto) {
    const protocol = this.protocolRepository
      .createQueryBuilder('protocol')
      .select(['protocol.id', 'protocol.name', 'protocol.logo'])

    if (query.chainId) {
      protocol.leftJoin('protocol.chain', 'chain').andWhere('chain.id = :chainId', { chainId: query.chainId })
    }

    if (query?.name) {
      protocol.andWhere('LOWER(protocol.name) LIKE LOWER(:name)', { name: `%${query.name}%` })
    }

    return protocol.getMany()
  }

  async findById(id: string) {
    const protocol = this.protocolRepository
      .createQueryBuilder('protocol')
      .where('protocol.id = :id', { id })
      .leftJoinAndSelect('protocol.chain', 'chain')
    return protocol.getOne()
  }

  async findByNetworkId(networkId: number) {
    const protocol = this.protocolRepository
      .createQueryBuilder('protocol')
      .where('protocol.networkId = :networkId', { networkId })
    return protocol.getOne()
  }

  async create(payload: CreateProtocolDto) {
    const protocol = new Protocol()
    protocol.name = payload.name
    protocol.chain = await this.chainRepository.find({
      where: {
        id: In(payload.chain),
      },
    })

    const result = await this.protocolRepository.save(protocol)
    return result
  }

  async update(id: string, payload: UpdateProtocolDto) {
    const protocol = new Protocol()
    protocol.id = id
    protocol.name = payload.name
    protocol.description = payload.description
    protocol.link = payload.link
    if (protocol.chain) {
      protocol.chain = await this.chainRepository.find({
        where: {
          id: In(payload.chain),
        },
      })
    }

    await this.protocolRepository.save(protocol)
    return await this.findById(id)
  }
}
