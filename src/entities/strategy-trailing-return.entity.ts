import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Strategy } from './strategy.entity'
import { Quartile } from '../models/quartile'
import { Period } from '../models/period'

@Entity('strategy_trailing_return')
export class StrategyTrailingReturn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column({
    type: 'enum',
    enum: Period,
  })
  period: Period

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

  @ManyToOne(() => Strategy, (strategy) => strategy.strategyTrailingReturn, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string
}
