import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Category } from './category.entity'

@Entity('category_growth')
export class CategoryGrowth {
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

  @ManyToOne(() => Category, (category) => category.categoryGrowth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ name: 'category_id' })
  categoryId: string
}
