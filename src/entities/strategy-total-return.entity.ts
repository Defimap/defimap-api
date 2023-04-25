import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Quartile } from '../models/quartile'
import { Strategy } from './strategy.entity'

@Entity('strategy_total_return')
export class StrategyTotalReturn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column({
    type: 'numeric',
  })
  value: number

  @Column({
    name: 'quartile_rank',
    type: 'enum',
    enum: Quartile,
  })
  quartileRank: Quartile

  @Column({
    name: 'percentile_rank',
    type: 'numeric',
    nullable: true,
  })
  percentileRank: number

  @Column({
    name: 'total_strategy_in_cat',
    type: 'numeric',
    nullable: true,
  })
  totalStrategyInCat: number

  @ManyToOne(() => Strategy, (strategy) => strategy.strategyTotalReturn, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string
}
