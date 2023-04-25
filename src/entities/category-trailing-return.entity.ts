import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Period } from '../models/period'
import { Quartile } from '../models/quartile'
import { Category } from './category.entity'

@Entity('category_trailing_return')
export class CategoryTrailingReturn {
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
    name: 'total_strategy_in_cat',
    type: 'numeric',
    nullable: true,
  })
  totalStrategyInCat: number

  @ManyToOne(() => Category, (category) => category.categoryTrailingReturn, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ name: 'category_id' })
  categoryId: string
}
