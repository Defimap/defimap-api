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

import { Period } from '../models/period'

import { Category } from './category.entity'

@Entity('category_risk_and_volatility')
export class CategoryRiskAndVolatility {
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

  @ManyToOne(() => Category, (category) => category.categoryRiskAndVolatility, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ name: 'category_id' })
  categoryId: string

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
