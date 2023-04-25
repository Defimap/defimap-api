import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Category } from 'src/entities/category.entity'
import { CreateCategoryDto } from '../dto/create.dto'

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name)

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    const category = this.categoryRepository.createQueryBuilder('category')
    return category.getMany()
  }

  async findById(id: string) {
    const category = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.categoryGrowth', 'categoryGrowth')
      .leftJoinAndSelect('category.categoryTotalReturn', 'categoryTotalReturn')
      .leftJoinAndSelect('category.categoryTrailingReturn', 'categoryTrailingReturn')
      .leftJoinAndSelect('category.categoryRiskAndVolatility', 'categoryRiskAndVolatility')
      .where('category.id = :id', { id })
    return category.getOne()
  }

  async create(payload: CreateCategoryDto) {
    const category = new Category()
    category.name = payload.name

    const result = await this.categoryRepository.save(category)
    return result
  }
}
