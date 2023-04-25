import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BetaUser } from 'src/entities/beta-user.entity'
import { BetaUserController } from './controller/beta-user.controller'
import { BetaUserService } from './service/beta-user.service'

@Module({
  imports: [TypeOrmModule.forFeature([BetaUser])],
  controllers: [BetaUserController],
  providers: [BetaUserService],
})
export class BetaUserModule {}
