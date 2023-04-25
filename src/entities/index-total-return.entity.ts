import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Quartile } from '../models/quartile'
import { Index } from './index.entity'

@Entity('index_total_return')
export class IndexTotalReturn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column({
    type: 'numeric',
  })
  value: number

  @ManyToOne(() => Index, (index) => index.indexTotalReturn, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'index_id' })
  index: Index

  @Column({ name: 'index_id' })
  indexId: string
}
