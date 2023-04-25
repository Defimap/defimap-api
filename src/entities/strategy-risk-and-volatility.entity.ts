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
import { RiskScale } from '../models/risk-scale'
import { Period } from '../models/period'

@Entity('strategy_risk_and_volatility')
export class StrategyRiskAndVolatility {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: Period,
  })
  period: Period

  @Column({
    type: 'numeric',
    comment: 'Standard Deviation',
    nullable: true,
  })
  sd: number

  @Column({
    type: 'numeric',
    comment: 'Sharpe Ratio',
    nullable: true,
  })
  sharpe: number

  @Column({
    type: 'numeric',
    nullable: true,
  })
  alpha: number

  @Column({
    type: 'numeric',
    nullable: true,
  })
  beta: number

  @Column({
    name: 'r_square',
    type: 'numeric',
    nullable: true,
  })
  rSquare: number

  @Column({
    name: 'max_drawdown',
    type: 'numeric',
    nullable: true,
  })
  maxDrawdown: number

  @Column({
    name: 'drawdown_peak_date',
    nullable: true,
  })
  drawdownPeakDate: Date

  @Column({
    name: 'drawdown_valley_date',
    nullable: true,
  })
  drawdownValleyDate: Date

  @Column({
    name: 'drawdown_duration',
    nullable: true,
  })
  drawdownDuration: string

  @Column({
    name: 'risk_vs_category',
    type: 'enum',
    enum: RiskScale,
    nullable: true,
  })
  riskVsCategory: RiskScale

  @Column({
    name: 'return_vs_category',
    type: 'enum',
    enum: RiskScale,
    nullable: true,
  })
  returnVsCategory: RiskScale

  @ManyToOne(() => Strategy, (strategy) => strategy.strategyRiskAndVolatility, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_id' })
  strategy: Strategy

  @Column({ name: 'strategy_id' })
  strategyId: string

  @Column({
    nullable: true,
  })
  date: Date

  @CreateDateColumn({
    name: 'created_at',
    nullable: true,
    readonly: true,
  })
  createdAt!: Date

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    readonly: true,
  })
  updatedAt!: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    readonly: true,
  })
  deletedAt!: Date
}
