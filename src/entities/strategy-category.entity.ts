import { Category } from './category.entity'
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import { Strategy } from './strategy.entity'

@Entity('strategy_category')
export class StrategyCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Strategy, (strategy) => strategy.strategyCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string

  @ManyToOne(() => Category, (category) => category.strategyCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ name: 'category_id' })
  categoryId: string
}
