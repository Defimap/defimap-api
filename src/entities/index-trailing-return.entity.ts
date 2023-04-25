import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Index } from './index.entity'
import { Period } from '../models/period'
import { Quartile } from '../models/quartile'

@Entity('index_trailing_return')
export class IndexTrailingReturn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column({
    type: 'enum',
    enum: Period,
  })
  period: Period

  @Column({
    type: 'numeric',
  })
  value: number

  @ManyToOne(() => Index, (index) => index.indexTrailingReturn, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'index_id' })
  index: Index

  @Column({ name: 'index_id' })
  indexId: string
}
