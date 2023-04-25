import { Strategy } from './strategy.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Token } from './token.entity'

@Entity('chain')
export class Chain {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  logo: string

  @Column({ nullable: true })
  link: string

  @Column({
    name: 'description',
    type: 'jsonb',
    default: [],
  })
  description: string[]

  @Column({
    name: 'network_id',
    unique: true,
  })
  networkId: number

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean

  @OneToMany(() => Strategy, (strategy) => strategy.chain)
  strategy: Strategy[]

  @OneToMany(() => Token, (token) => token.chain)
  token: Token[]

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
