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
import { Strategy } from './strategy.entity'
import { Token } from './token.entity'

@Entity('supply_strategy_token')
export class SupplyStrategyToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @ManyToOne(() => Token, (token) => token.supplyStrategyToken)
  @JoinColumn({ name: 'token_id' })
  token: Token

  @Column({ name: 'token_id' })
  tokenId: string

  @ManyToOne(() => Strategy, (strategy) => strategy.supplyStrategyToken, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string
}
