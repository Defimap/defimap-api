import { Transform } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Category } from './category.entity'
import { Chain } from './chain.entity'
import { Index } from './index.entity'
import { Protocol } from './protocol.entity'
import { RewardStrategyToken } from './reward-strategy-token.entity'
import { StrategyAPR } from './strategy-apr.entity'
import { StrategyCategory } from './strategy-category.entity'
import { StrategyGrowth } from './strategy-growth.entity'
import { StrategyRiskAndVolatility } from './strategy-risk-and-volatility.entity'
import { StrategyTokenGrowth } from './strategy-token-growth.entity'
import { StrategyTotalReturn } from './strategy-total-return.entity'
import { StrategyTrailingReturn } from './strategy-trailing-return.entity'
import { StrategyTVL } from './strategy-tvl.entity'
import { SupplyStrategyToken } from './supply-strategy-token.entity'

@Entity('strategy')
export class Strategy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @Column({
    type: 'numeric',
    nullable: true,
  })
  @Transform((value) => Number(value))
  apr: number

  @Column({
    type: 'numeric',
    nullable: true,
  })
  @Transform((value) => Number(value))
  tvl: number

  @Column()
  publish: boolean

  @Column({
    name: 'invest_link',
    nullable: true,
  })
  investLink: string

  @Column({
    default: false,
  })
  verify: boolean

  @UpdateDateColumn({
    name: 'data_update',
    nullable: true,
  })
  dataUpdate: Date

  @ManyToOne(() => Category, (category) => category.strategy)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ name: 'category_id' })
  categoryId: string

  @ManyToOne(() => Protocol, (protocol) => protocol.strategy)
  @JoinColumn({ name: 'protocol_id' })
  protocol: Protocol

  @Column({ name: 'protocol_id' })
  protocolId: string

  @ManyToOne(() => Chain, (chain) => chain.strategy)
  @JoinColumn({ name: 'chain_id' })
  chain: Chain

  @Column({ name: 'chain_id' })
  chainId: string

  @OneToMany(() => StrategyGrowth, (strategyGrowth) => strategyGrowth.strategy)
  strategyGrowth: StrategyGrowth[]

  @OneToMany(() => StrategyTotalReturn, (strategyTotalReturn) => strategyTotalReturn.strategy)
  strategyTotalReturn: StrategyTotalReturn[]

  @OneToMany(() => StrategyTrailingReturn, (strategyTrailingReturn) => strategyTrailingReturn.strategy)
  strategyTrailingReturn: StrategyTrailingReturn[]

  @OneToMany(() => StrategyRiskAndVolatility, (strategyRiskAndVolatility) => strategyRiskAndVolatility.strategy)
  strategyRiskAndVolatility: StrategyRiskAndVolatility[]

  @OneToMany(() => RewardStrategyToken, (rewardStrategyToken) => rewardStrategyToken.strategy)
  rewardStrategyToken: RewardStrategyToken[]

  @OneToMany(() => SupplyStrategyToken, (supplyStrategyToken) => supplyStrategyToken.strategy)
  supplyStrategyToken: SupplyStrategyToken[]

  @OneToMany(() => StrategyTVL, (strategyTVL) => strategyTVL.strategy)
  strategyTVL: StrategyTVL[]

  @OneToMany(() => StrategyAPR, (strategyAPR) => strategyAPR.strategy)
  strategyAPR: StrategyAPR[]

  @OneToMany(() => StrategyTokenGrowth, (strategyTokenGrowth) => strategyTokenGrowth.strategy)
  strategyTokenGrowth: StrategyTokenGrowth[]

  @OneToMany(() => StrategyCategory, (strategyCategory) => strategyCategory.strategy)
  strategyCategory: StrategyCategory[]

  @ManyToOne(() => Index, (index) => index.strategy)
  @JoinColumn({ name: 'index_id' })
  index: Index

  @Column({ name: 'index_id', nullable: true })
  indexId: string

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
