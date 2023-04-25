import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Chain } from './chain.entity'
import { Strategy } from './strategy.entity'

@Entity('protocol')
export class Protocol {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  link: string

  @Column({ nullable: true })
  logo: string

  @Column({
    name: 'description',
    type: 'jsonb',
    default: [],
  })
  description: string[]

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean

  @ManyToMany(() => Chain)
  @JoinTable({
    name: 'protocol_chain',
    joinColumn: {
      name: 'protocol_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'chain_id',
      referencedColumnName: 'id',
    },
  })
  chain: Chain[]

  @OneToMany(() => Strategy, (strategy) => strategy.protocol)
  strategy: Strategy[]

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
