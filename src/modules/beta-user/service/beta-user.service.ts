import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BetaUser } from 'src/entities/beta-user.entity'
import { CreateBetaUserRequestDto } from '../dto/request/create.request.dto'

@Injectable()
export class BetaUserService {
  private readonly logger = new Logger(BetaUserService.name)

  constructor(@InjectRepository(BetaUser) private readonly betaUserRepository: Repository<BetaUser>) {}

  async create(body: CreateBetaUserRequestDto): Promise<BetaUser> {
    const { email, feature, pricingOption } = body

    try {
      const result = await this.betaUserRepository
        .createQueryBuilder('betaUser')
        .where('LOWER(betaUser.email) = LOWER(:email)', { email: body.email })
        .andWhere('LOWER(betaUser.feature) = LOWER(:feature)', { feature: body.feature })
        .andWhere('LOWER(betaUser.pricingOption) = LOWER(:pricingOption)', { pricingOption: body.pricingOption })
        .getOne()
      console.log('result', result)

      if (result) {
        return result
      }

      const response = await this.betaUserRepository.save({ email, feature, pricingOption })
      return response
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(`Unable to create record: ${error.detail}`, HttpStatus.BAD_REQUEST)
    }
  }
}
