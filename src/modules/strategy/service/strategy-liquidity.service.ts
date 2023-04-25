import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StrategyTVL } from 'src/entities/strategy-tvl.entity'
import { Repository } from 'typeorm'
import { QueryStrategyLiquidityDto } from '../dto/query.dto'

@Injectable()
export class StrategyLiquidityService {
  private readonly logger = new Logger(StrategyLiquidityService.name)
  constructor(@InjectRepository(StrategyTVL) private readonly strategyTVLRepository: Repository<StrategyTVL>) {}

  async findAll(query: QueryStrategyLiquidityDto) {
    const { strategyId } = query

    const strategyTVL = await this.strategyTVLRepository.find({
      where: {
        strategyId,
      },
      order: { date: 'ASC' },
    })

    return {
      strategyTVL,
    }
  }
}
