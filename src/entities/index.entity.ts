import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  Column,
} from 'typeorm'

import { IndexGrowth } from './index-growth.entity'
import { IndexRiskAndVolatility } from './index-risk-and-volatility.entity'
import { IndexTotalReturn } from './index-total-return.entity'
import { IndexTrailingReturn } from './index-trailing-return.entity'
import { Strategy } from './strategy.entity'

@Entity('index')
export class Index {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @OneToMany(() => IndexGrowth, (indexGrowth) => indexGrowth.index)
  indexGrowth: IndexGrowth[]

  @OneToMany(() => IndexTrailingReturn, (indexTrailingReturn) => indexTrailingReturn.index)
  indexTrailingReturn: IndexTrailingReturn[]

  @OneToMany(() => IndexTotalReturn, (indexTotalReturn) => indexTotalReturn.index)
  indexTotalReturn: IndexTotalReturn[]

  @OneToMany(() => IndexRiskAndVolatility, (indexRiskAndVolatility) => indexRiskAndVolatility.index)
  indexRiskAndVolatility: IndexRiskAndVolatility[]

  @OneToMany(() => Strategy, (strategy) => strategy.index)
  strategy: Strategy[]

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
