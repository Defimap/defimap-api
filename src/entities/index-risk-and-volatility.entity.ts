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

import { Index } from './index.entity'
import { Period } from '../models/period'

@Entity('index_risk_and_volatility')
export class IndexRiskAndVolatility {
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

  @ManyToOne(() => Index, (index) => index.indexRiskAndVolatility, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'index_id' })
  index: Index

  @Column({ name: 'index_id' })
  indexId: string

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
