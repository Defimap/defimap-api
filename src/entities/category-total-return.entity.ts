import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Quartile } from '../models/quartile'
import { Category } from './category.entity'

@Entity('category_total_return')
export class CategoryTotalReturn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column({
    type: 'numeric',
  })
  value: number

  @Column({
    name: 'total_strategy_in_cat',
    type: 'numeric',
    nullable: true,
  })
  totalStrategyInCat: number

  @ManyToOne(() => Category, (category) => category.categoryTotalReturn, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ name: 'category_id' })
  categoryId: string
}
