import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Strategy } from './strategy.entity'

@Entity('strategy_growth')
export class StrategyGrowth {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column({
    name: 'start_day_investment',
    type: 'numeric',
  })
  startDayInvestment: number

  @Column({
    name: 'end_day_investment',
    type: 'numeric',
  })
  endDayInvestment: number

  @ManyToOne(() => Strategy, (strategy) => strategy.strategyGrowth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string
}
