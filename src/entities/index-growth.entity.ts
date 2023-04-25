import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Index } from './index.entity'

@Entity('index_growth')
export class IndexGrowth {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @Column({
    name: 'start_day_investment',
    type: 'numeric',
  })
  startDayInvestment: number

  @Column({
    name: 'end_day_investment',
    type: 'numeric',
  })
  endDayInvestment: number

  @ManyToOne(() => Index, (index) => index.indexGrowth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'index_id' })
  index: Index

  @Column({ name: 'index_id' })
  indexId: string
}
