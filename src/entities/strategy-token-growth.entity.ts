import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Strategy } from './strategy.entity'
import { Token } from './token.entity'

@Entity('strategy_token_growth')
export class StrategyTokenGrowth {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Token, (token) => token.strategyTokenGrowth)
  @JoinColumn({ name: 'token_id' })
  token: Token

  @Column({ name: 'token_id' })
  tokenId: string

  @ManyToOne(() => Strategy, (strategy) => strategy.strategyTokenGrowth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string

  @Column()
  date: Date

  @Column({
    type: 'numeric',
  })
  profit: number

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
