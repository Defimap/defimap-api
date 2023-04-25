import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Token } from './token.entity'

@Entity('token_price')
export class TokenPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'numeric' })
  value: number

  @Column({ type: 'numeric', nullable: true })
  high: number

  @Column({ type: 'numeric', nullable: true })
  low: number

  @Column({ type: 'numeric', nullable: true })
  volume: number

  @Column({ type: 'numeric', nullable: true })
  open: number

  @Column()
  timestamp: Date

  @ManyToOne(() => Token, (token) => token.tokenPrice)
  @JoinColumn({ name: 'token_id' })
  token: Token

  @Column({ name: 'token_id' })
  tokenId: string
}
