import { StrategyCategory } from './../../../entities/strategy-category.entity'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Repository } from 'typeorm'

import { Strategy } from 'src/entities/strategy.entity'
import { CategoryGrowthService } from 'src/modules/category/service/category-growth.service'
import { CategoryRiskAndVolatilityService } from 'src/modules/category/service/category-risk-and-volatility.service'
import { CategoryTotalReturnService } from 'src/modules/category/service/category-total-return.service'
import { CategoryTrailingReturnService } from 'src/modules/category/service/category-trailing-return.service'
import { IndexGrowthService } from 'src/modules/index/service/index-growth.service'
import { IndexRiskAndVolatilityService } from 'src/modules/index/service/index-risk-and-volatility.service'
import { IndexTotalReturnService } from 'src/modules/index/service/index-total-return.service'
import { IndexTrailingReturnService } from 'src/modules/index/service/index-trailing-return.service'
import { paginate } from 'src/utils/paginate'
import { BodyStrategyCalcGrowthDto } from '../dto/body.dto'
import { CreateStrategyDto } from '../dto/create.dto'
import { QueryRiskAndVolatilityDto, QueryStrategyDto, QueryStrategyLiquidityDto } from '../dto/query.dto'
import { StrategyGrowthService } from './strategy-growth.service'
import { StrategyLiquidityService } from './strategy-liquidity.service'
import { StrategyRiskAndVolatilityService } from './strategy-risk-and-volatility.service'
import { StrategyTotalReturnService } from './strategy-total-return.service'
import { StrategyTrailingReturnService } from './strategy-trailing-return.service'
import { isBoolean } from 'class-validator'

@Injectable()
export class StrategyService {
  private readonly logger = new Logger(StrategyService.name)

  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
    @InjectRepository(StrategyCategory)
    private readonly strategyCategoryRepository: Repository<StrategyCategory>,

    private readonly indexTotalReturnService: IndexTotalReturnService,
    private readonly indexTrailingReturnService: IndexTrailingReturnService,
    private readonly categoryTotalReturnService: CategoryTotalReturnService,
    private readonly strategyTotalReturnService: StrategyTotalReturnService,
    private readonly categoryTrailingReturnService: CategoryTrailingReturnService,
    private readonly strategyTrailingReturnService: StrategyTrailingReturnService,
    private readonly categoryGrowthService: CategoryGrowthService,
    private readonly indexGrowthService: IndexGrowthService,
    private readonly strategyGrowthService: StrategyGrowthService,
    private readonly indexRiskAndVolatilityService: IndexRiskAndVolatilityService,
    private readonly categoryRiskAndVolatilityService: CategoryRiskAndVolatilityService,
    private readonly strategyRiskAndVolatilityService: StrategyRiskAndVolatilityService,
    private readonly strategyLiquidityService: StrategyLiquidityService,
  ) {}

  async findAll(query: QueryStrategyDto) {
    this.logger.log(query)

    const strategy = this.strategyRepository
      .createQueryBuilder('strategy')
      .leftJoinAndSelect('strategy.protocol', 'protocol')
      .leftJoinAndSelect('strategy.chain', 'chain')
      .leftJoinAndSelect('strategy.category', 'category')
      .leftJoinAndSelect(
        'strategy.strategyRiskAndVolatility',
        'strategyRiskAndVolatility',
        'strategy.id = strategyRiskAndVolatility.strategyId AND strategyRiskAndVolatility.date = strategy.dataUpdate',
      )
      .leftJoinAndSelect(
        'strategy.strategyTrailingReturn',
        'strategyTrailingReturn',
        'strategy.id = strategyTrailingReturn.strategyId AND strategyTrailingReturn.date = strategy.dataUpdate',
      )
      .leftJoinAndSelect('strategy.strategyCategory', 'strategyCategory')
      .leftJoinAndSelect('strategyCategory.category', 'strategyCategoryCategory')
      .leftJoin('strategy.strategyCategory', 'strategyCategoryAll')

    if (isBoolean(query?.publish)) {
      strategy.andWhere('strategy.publish = :publish', { publish: query?.publish })
    }

    if (Boolean(query?.protocolIds?.length)) {
      strategy.andWhere('strategy.protocolId IN (:...protocolIds)', { protocolIds: query.protocolIds })
    }

    if (Boolean(query?.chainIds?.length)) {
      strategy.andWhere('strategy.chainId IN (:...chainIds)', { chainIds: query.chainIds })
    }

    if (Boolean(query?.tvl?.min)) {
      strategy.andWhere('strategy.tvl >= :min', { min: query?.tvl?.min })
    }

    if (Boolean(query?.tvl?.max)) {
      strategy.andWhere('strategy.tvl <= :max', { max: query?.tvl?.max })
    }

    if (!isNaN(query?.oneYearReturn?.min)) {
      strategy.andWhere('strategyTrailingReturn.value >= :minReturn', {
        minReturn: Number(query?.oneYearReturn?.min) / 100,
      })
    }

    if (!isNaN(query?.oneYearReturn?.max)) {
      const max = Number(query?.oneYearReturn?.max) === 100 ? 10000000 : Number(query?.oneYearReturn?.max)
      strategy.andWhere('strategyTrailingReturn.value <= :maxReturn', {
        maxReturn: max / 100,
      })
    }

    if (query?.name) {
      strategy.andWhere('LOWER(strategy.name) LIKE LOWER(:name)', { name: `%${query.name}%` })
    }

    if (Boolean(query?.rewardTokenIds?.length)) {
      strategy
        .leftJoin('strategy.rewardStrategyToken', 'rewardStrategyToken')
        .andWhere('rewardStrategyToken.tokenId IN (:...rewardTokenIds)', {
          rewardTokenIds: query?.rewardTokenIds,
        })
    }

    if (Boolean(query?.supplyTokenIds?.length)) {
      strategy
        .leftJoin('strategy.supplyStrategyToken', 'supplyStrategyToken')
        .andWhere('supplyStrategyToken.tokenId IN (:...supplyTokenIds)', {
          supplyTokenIds: query?.supplyTokenIds,
        })
    }

    if (Boolean(query?.categoryIds?.length)) {
      strategy.andWhere('(strategyCategoryAll.categoryId IN (:...categoryIds))', {
        categoryIds: query?.categoryIds,
      })
    }

    if (query?.sortBy) {
      switch (query?.sortBy) {
        case 'name':
          strategy.orderBy('strategy.name', query?.order)
          break
        case 'tvl':
          strategy.orderBy('strategy.tvl', query?.order)
          break
        case 'apr':
          strategy.orderBy('strategy.apr', query?.order)
          break
        case 'sharpe':
          strategy.orderBy('strategyRiskAndVolatility.sharpe', query?.order)
          break
        case 'category':
          strategy.orderBy('category.name', query?.order)
          break
        case 'protocol':
          strategy.orderBy('protocol.name', query?.order)
          break
        case 'chain':
          strategy.orderBy('chain.name', query?.order)
          break
        default:
          break
      }
    }

    return paginate<Strategy>(strategy, {
      limit: query.limit || 10,
      page: query.page || 1,
    })
  }

  async findBySlug(slug: string) {
    const data = this.strategyRepository
      .createQueryBuilder('strategy')
      .leftJoinAndSelect('strategy.rewardStrategyToken', 'rewardStrategyToken')
      .leftJoinAndSelect('strategy.supplyStrategyToken', 'supplyStrategyToken')
      .leftJoinAndSelect('strategy.index', 'index')
      .leftJoinAndSelect('strategy.category', 'category')
      .leftJoinAndSelect('strategy.protocol', 'protocol')
      .leftJoinAndSelect('strategy.chain', 'chain')
      .leftJoinAndSelect('supplyStrategyToken.token', 'supplyStrategyTokenToken')
      .leftJoinAndSelect('rewardStrategyToken.token', 'rewardStrategyTokenToken')
      .leftJoinAndSelect('strategy.strategyCategory', 'strategyCategory')
      .leftJoinAndSelect('strategyCategory.category', 'strategyCategoryCategory')
      .where('strategy.slug = :slug', { slug })

    return data.getOne()
  }

  async findById(id: string) {
    const data = this.strategyRepository
      .createQueryBuilder('strategy')
      .leftJoinAndSelect('strategy.strategyGrowth', 'strategyGrowth')
      .leftJoinAndSelect('strategy.strategyTotalReturn', 'strategyTotalReturn')
      .leftJoinAndSelect('strategy.strategyTrailingReturn', 'strategyTrailingReturn')
      .leftJoinAndSelect('strategy.strategyMarketVolatilityMeasures', 'strategyMarketVolatilityMeasures')
      .leftJoinAndSelect('strategy.strategyRiskAndVolatility', 'strategyRiskAndVolatility')
      .leftJoinAndSelect('strategy.rewardStrategyToken', 'rewardStrategyToken')
      .leftJoinAndSelect('strategy.supplyStrategyToken', 'supplyStrategyToken')
      .leftJoinAndSelect('strategy.strategyTVL', 'strategyTVL')
      .leftJoinAndSelect('strategy.strategyAPR', 'strategyAPR')
      .leftJoinAndSelect('strategy.index', 'index')
      .leftJoinAndSelect('strategy.category', 'category')
      .leftJoinAndSelect('strategy.protocol', 'protocol')
      .leftJoinAndSelect('strategy.chain', 'chain')
      .leftJoinAndSelect('supplyStrategyToken.token', 'supplyStrategyTokenToken')
      .leftJoinAndSelect('rewardStrategyToken.token', 'rewardStrategyTokenToken')
      .leftJoinAndSelect('strategy.strategyCategory', 'strategyCategory')
      .leftJoinAndSelect('strategyCategory.category', 'strategyCategoryCategory')
      .where('strategy.id = :id', { id })

    return data.getOne()
  }

  async create(payload: CreateStrategyDto) {
    const data = new Strategy()
    data.name = payload.name
    data.apr = payload.apr
    data.tvl = payload.tvl
    data.publish = payload.publish
    data.categoryId = payload.categoryId
    data.protocolId = payload.protocolId
    data.chainId = payload.chainId
    data.indexId = payload.indexId
    data.slug = payload.slug

    const result = await this.strategyRepository.save(data)
    return result
  }

  async getPerformance(slug: string) {
    const data = await this.strategyRepository
      .createQueryBuilder('strategy')
      .where('strategy.slug = :slug', { slug })
      .getOne()

    if (!data) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    const startDate = dayjs().subtract(12, 'month').format('YYYY-MM')
    const endDate = dayjs().subtract(1, 'month').format('YYYY-MM')

    const startDateGrowth = dayjs('2022-01-01', 'YYYY-MM-DD').format('YYYY-MM-DD')
    const endDateGrowth = dayjs(data?.dataUpdate).format('YYYY-MM-DD')

    const [
      resIndexTotalReturn,
      resCategoryTotalReturn,
      resStrategyTotalReturn,
      resIndexTrailingReturn,
      resCategoryTrailingReturn,
      resStrategyTrailingReturn,
      resIndexGrowth,
      resCategoryGrowth,
      resStrategyGrowth,
    ] = await Promise.all([
      this.indexTotalReturnService.findAll({
        indexId: data?.indexId,
        startDate,
        endDate,
        date: data?.dataUpdate,
      }),
      this.categoryTotalReturnService.findAll({
        categoryId: data?.categoryId,
        startDate,
        endDate,
        date: data?.dataUpdate,
      }),
      this.strategyTotalReturnService.findAll({
        strategyId: data?.id,
        startDate,
        endDate,
        date: data?.dataUpdate,
      }),
      this.indexTrailingReturnService.findAll({
        indexId: data?.indexId,
        date: data?.dataUpdate,
      }),
      this.categoryTrailingReturnService.findAll({
        categoryId: data?.categoryId,
        date: data?.dataUpdate,
      }),
      this.strategyTrailingReturnService.findAll({
        strategyId: data?.id,
        date: data?.dataUpdate,
      }),
      this.indexGrowthService.findAll({
        indexId: data?.indexId,
        startDate: startDateGrowth,
        endDate: endDateGrowth,
        date: data?.dataUpdate,
      }),
      this.categoryGrowthService.findAll({
        categoryId: data?.categoryId,
        startDate: startDateGrowth,
        endDate: endDateGrowth,
        date: data?.dataUpdate,
      }),
      this.strategyGrowthService.findAll({
        strategyId: data?.id,
        startDate: startDateGrowth,
        endDate: endDateGrowth,
        date: data?.dataUpdate,
      }),
    ])

    const firstIndexGrowth = resIndexGrowth[0]
    const firstCategoryGrowth = resCategoryGrowth[0]
    const firstStrategyGrowth = resStrategyGrowth[0]

    const maxDate = dayjs(
      Math.max(firstIndexGrowth.date.getTime(), firstCategoryGrowth.date.getTime(), firstStrategyGrowth.date.getTime()),
    ).toDate()

    const beginIndexGrowth = resIndexGrowth.findIndex((item) => item.date.getTime() === maxDate.getTime())
    const beginCategoryGrowth = resCategoryGrowth.findIndex((item) => item.date.getTime() === maxDate.getTime())

    const slicedIndexGrowth = resIndexGrowth.slice(beginIndexGrowth)
    const slicedCategoryGrowth = resCategoryGrowth.slice(beginCategoryGrowth)

    const indexEndDayInvestmentDenominator = slicedIndexGrowth[0].endDayInvestment
    const categoryEndDayInvestmentDenominator = slicedCategoryGrowth[0].endDayInvestment

    let modifiedIndexGrowth = slicedIndexGrowth
    let modifiedCategoryGrowth = slicedCategoryGrowth
    let modifiedStrategyGrowth = resStrategyGrowth

    if (indexEndDayInvestmentDenominator !== 10000) {
      modifiedIndexGrowth = modifiedIndexGrowth.map((item) => {
        return {
          ...item,
          startDayInvestment: (item.startDayInvestment * 10000) / indexEndDayInvestmentDenominator,
          endDayInvestment: (item.endDayInvestment * 10000) / indexEndDayInvestmentDenominator,
        }
      })
    }

    if (categoryEndDayInvestmentDenominator !== 10000) {
      modifiedCategoryGrowth = modifiedCategoryGrowth.map((item) => {
        return {
          ...item,
          startDayInvestment: (item.startDayInvestment * 10000) / categoryEndDayInvestmentDenominator,
          endDayInvestment: (item.endDayInvestment * 10000) / categoryEndDayInvestmentDenominator,
        }
      })
    }

    // Set start investment to 10k
    if (Number(firstStrategyGrowth?.endDayInvestment) !== 10000) {
      modifiedStrategyGrowth = resStrategyGrowth?.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            endDayInvestment: 10000,
          }
        }
        return item
      })
    }

    return {
      indexTotalReturn: resIndexTotalReturn,
      categoryTotalReturn: resCategoryTotalReturn,
      strategyTotalReturn: resStrategyTotalReturn,
      indexTrailingReturn: resIndexTrailingReturn,
      categoryTrailingReturn: resCategoryTrailingReturn,
      strategyTrailingReturn: resStrategyTrailingReturn,
      indexGrowth: modifiedIndexGrowth,
      categoryGrowth: modifiedCategoryGrowth,
      strategyGrowth: modifiedStrategyGrowth,
    }
  }

  async getRiskAndVolatility(slug: string, query: QueryRiskAndVolatilityDto) {
    const data = await this.strategyRepository
      .createQueryBuilder('strategy')
      .where('strategy.slug = :slug', { slug })
      .getOne()

    if (!data) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    const [indexRiskAndVolatility, categoryRiskAndVolatility, strategyRiskAndVolatility] = await Promise.all([
      this.indexRiskAndVolatilityService.findAll({
        indexId: data?.indexId,
        period: query?.period,
        date: data?.dataUpdate,
      }),
      this.categoryRiskAndVolatilityService.findAll({
        categoryId: data?.categoryId,
        period: query?.period,
        date: data?.dataUpdate,
      }),
      this.strategyRiskAndVolatilityService.findAll({
        strategyId: data?.id,
        period: query?.period,
        date: data?.dataUpdate,
      }),
    ])

    return {
      indexRiskAndVolatility,
      categoryRiskAndVolatility,
      strategyRiskAndVolatility,
    }
  }

  async getLiquidity(slug: string) {
    const data = await this.strategyRepository.findOne({ where: { slug } })

    if (!data) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    const query: QueryStrategyLiquidityDto = {
      strategyId: data?.id,
    }

    const strategyLiquidity = await this.strategyLiquidityService.findAll(query)

    return strategyLiquidity
  }

  async calcGrowth(body: BodyStrategyCalcGrowthDto) {
    const { initialInvestment, startDate, endDate, indexToken, category, strategy } = body

    try {
      const [indexGrowth, categoryGrowth, strategyGrowth] = await Promise.all([
        this.indexGrowthService.calcGrowth(initialInvestment, startDate, endDate, indexToken),
        this.categoryGrowthService.calcGrowth(initialInvestment, startDate, endDate, category),
        this.strategyGrowthService.calcGrowth(initialInvestment, startDate, endDate, strategy),
      ])

      return {
        indexGrowth,
        categoryGrowth,
        strategyGrowth,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async getSitemap() {
    const data = await this.strategyRepository.createQueryBuilder('strategy').select('strategy.slug').getMany()
    return data?.map((item) => `https://defimap.app/strategy/${item?.slug}`)
  }

  async migrationData() {
    const res = await this.strategyRepository.find()

    res?.map((item) => {
      const data = new StrategyCategory()
      data.categoryId = item?.categoryId
      data.strategyId = item?.id
      this.strategyCategoryRepository.save(data)
    })
  }
}
