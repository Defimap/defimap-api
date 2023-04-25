import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Chain } from 'src/entities/chain.entity'
import { ChainController } from './chain.controller'
import { ChainService } from './chain.service'

@Module({
  imports: [TypeOrmModule.forFeature([Chain])],
  controllers: [ChainController],
  providers: [ChainService],
  exports: [ChainService],
})
export class ChainModule {}
