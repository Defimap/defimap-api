import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Strategy } from './strategy.entity'

@Entity('strategy_tvl')
export class StrategyTVL {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column({
    type: 'numeric',
  })
  tvl: number

  @Column({
    name: 'change_tvl_daily',
    type: 'numeric',
  })
  changeTvlDaily: number

  @Column({
    name: 'change_tvl_monthly',
    type: 'numeric',
  })
  changeTvlMonthly: number

  @Column({
    name: 'change_tvl_yearly',
    type: 'numeric',
  })
  changeTvlYearly: number

  @Column({
    name: 'percent_change',
    type: 'numeric',
  })
  percentChange: number

  @ManyToOne(() => Strategy, (strategy) => strategy.strategyTVL, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string
}
