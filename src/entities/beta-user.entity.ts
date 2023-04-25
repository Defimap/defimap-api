import { IsEmail } from 'class-validator'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('beta_user')
export class BetaUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsEmail()
  email: string

  @Column({ nullable: true })
  feature: string

  @Column({ nullable: true, name: 'pricing_option' })
  pricingOption: string

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
