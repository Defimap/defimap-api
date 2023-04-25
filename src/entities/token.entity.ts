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
import { Chain } from './chain.entity'
import { RewardStrategyToken } from './reward-strategy-token.entity'
import { StrategyTokenGrowth } from './strategy-token-growth.entity'
import { SupplyStrategyToken } from './supply-strategy-token.entity'
import { TokenPrice } from './token-price.entity'

@Entity('token')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  symbol: string

  @Column()
  address: string

  @Column({ nullable: true })
  logo: string

  @Column({ nullable: true })
  link: string

  @Column({
    name: 'description',
    type: 'jsonb',
    default: [],
  })
  description: string[]

  @ManyToOne(() => Chain, (chain) => chain.token)
  @JoinColumn({ name: 'chain_id' })
  chain: Chain

  @OneToMany(() => TokenPrice, (tokenPrice) => tokenPrice.token)
  tokenPrice: TokenPrice[]

  @OneToMany(() => RewardStrategyToken, (rewardStrategyToken) => rewardStrategyToken.strategy)
  rewardStrategyToken: RewardStrategyToken[]

  @OneToMany(() => SupplyStrategyToken, (supplyStrategyToken) => supplyStrategyToken.strategy)
  supplyStrategyToken: SupplyStrategyToken[]

  @OneToMany(() => StrategyTokenGrowth, (strategyTokenGrowth) => strategyTokenGrowth.token)
  strategyTokenGrowth: StrategyTokenGrowth[]

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
