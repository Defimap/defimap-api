import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Strategy } from './strategy.entity'

@Entity('strategy_apr')
export class StrategyAPR {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  timestamp: Date

  @Column({
    type: 'numeric',
  })
  value: number

  @ManyToOne(() => Strategy, (strategy) => strategy.strategyAPR, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string
}
