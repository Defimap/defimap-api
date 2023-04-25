import { ProtocolController } from './protocol.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProtocolService } from './protocol.service'
import { Protocol } from 'src/entities/protocol.entity'
import { Chain } from 'src/entities/chain.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Protocol, Chain])],
  controllers: [ProtocolController],
  providers: [ProtocolService],
  exports: [ProtocolService],
})
export class ProtocolModule {}
