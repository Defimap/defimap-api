import { Strategy } from './strategy.entity'
import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { Token } from './token.entity'

@Entity('reward_strategy_token')
export class RewardStrategyToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Token, (token) => token.rewardStrategyToken)
  @JoinColumn({ name: 'token_id' })
  token: Token

  @Column({ name: 'token_id' })
  tokenId: string

  @ManyToOne(() => Strategy, (strategy) => strategy.rewardStrategyToken, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string

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
