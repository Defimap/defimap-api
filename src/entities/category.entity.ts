import { StrategyCategory } from './strategy-category.entity'
import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  Column,
} from 'typeorm'

import { CategoryRiskAndVolatility } from './category-risk-and-volatility.entity'
import { CategoryTrailingReturn } from './category-trailing-return.entity'
import { CategoryGrowth } from './category-growth.entity'
import { Strategy } from './strategy.entity'
import { CategoryTotalReturn } from './category-total-return.entity'

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @OneToMany(() => Strategy, (strategy) => strategy.category)
  strategy: Strategy[]

  @OneToMany(() => CategoryGrowth, (categoryGrowth) => categoryGrowth.category)
  categoryGrowth: CategoryGrowth[]

  @OneToMany(() => CategoryTrailingReturn, (categoryTrailingReturn) => categoryTrailingReturn.category)
  categoryTrailingReturn: CategoryTrailingReturn[]

  @OneToMany(() => CategoryTotalReturn, (categoryTotalReturn) => categoryTotalReturn.category)
  categoryTotalReturn: CategoryTotalReturn[]

  @OneToMany(() => CategoryRiskAndVolatility, (categoryRiskAndVolatility) => categoryRiskAndVolatility.category)
  categoryRiskAndVolatility: CategoryRiskAndVolatility[]

  @OneToMany(() => StrategyCategory, (strategyCategory) => strategyCategory.category)
  strategyCategory: StrategyCategory[]

  @CreateDateColumn({
    name: 'created_at',
    readonly: true,
  })
  createdAt!: Date

  @UpdateDateColumn({
    name: 'updated_at',
    readonly: true,
  })
  updatedAt!: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    readonly: true,
  })
  deletedAt!: Date
}
