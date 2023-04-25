import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Token } from 'src/entities/token.entity'
import { Chain } from 'src/entities/chain.entity'
import { CreateTokenDto } from './dto/create.dto'
import { QueryTokenDto } from './dto/query.dto'

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name)

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async findAll(query: QueryTokenDto) {
    const token = this.tokenRepository
      .createQueryBuilder('token')
      .select(['token.id', 'token.name', 'token.symbol', 'token.address', 'token.logo'])

    if (query.chainId) {
      token.leftJoin('token.chain', 'chain').andWhere('token.chain.id = :chainId', { chainId: query.chainId })
    }

    if (query?.name) {
      token.andWhere('LOWER(token.name) LIKE LOWER(:name)', { name: `%${query.name}%` })
    }

    return token.getMany()
  }

  async findById(id: string) {
    const token = this.tokenRepository
      .createQueryBuilder('token')
      .where('token.id = :id', { id })
      .leftJoinAndSelect('token.chain', 'chain')
    return token.getOne()
  }

  async create(payload: CreateTokenDto) {
    const token = new Token()
    token.name = payload.name
    token.symbol = payload.symbol
    token.address = payload.address
    token.logo = payload.logo
    token.description = payload.description
    token.link = payload.link
    const chain = new Chain()
    chain.id = payload.chainId
    token.chain = chain

    const result = await this.tokenRepository.save(token)
    return result
  }
}
