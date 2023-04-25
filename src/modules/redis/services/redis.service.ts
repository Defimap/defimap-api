import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import * as redis from 'redis'
import { Cache } from 'cache-manager'

@Injectable()
export class RedisService {
  private logger = new Logger(RedisService.name)
  private publisher: redis.RedisClient

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private configService: ConfigService) {
    this.initialRedis()
  }

  initialRedis() {
    this.publisher = redis.createClient({
      host: this.configService.get<string>('redis.host'),
      port: this.configService.get<number>('redis.port'),
      auth_pass: this.configService.get('redis.authPass'),
    })
  }

  async set(keyName: string, data: any, ttl = 0) {
    try {
      const nodeEnv = this.configService.get<string>('nodeEnv')
      const redisKey = `${nodeEnv}-${keyName}`
      await this.cacheManager.del(redisKey)
      await this.cacheManager.set(redisKey, JSON.stringify(data), { ttl })
    } catch (error) {
      throw error
    }
  }

  async remove(keyName: string) {
    try {
      const nodeEnv = this.configService.get<string>('nodeEnv')
      const redisKey = `${nodeEnv}-${keyName}`
      await this.cacheManager.del(redisKey)
    } catch (error) {
      throw error
    }
  }

  async clear() {
    try {
      await this.cacheManager.reset()
    } catch (error) {
      throw error
    }
  }

  async get(keyName: string) {
    try {
      const nodeEnv = this.configService.get<string>('nodeEnv')
      const redisKey = `${nodeEnv}-${keyName}`
      const rawData: string = await this.cacheManager.get(redisKey)
      const data = JSON.parse(rawData)
      return data
    } catch (error) {
      throw error
    }
  }

  handlePublishMessage(topic: string, message: string) {
    const nodeEnv = this.configService.get<string>('nodeEnv')
    this.publisher.publish(`${nodeEnv}-${topic}`, message)
  }
}
