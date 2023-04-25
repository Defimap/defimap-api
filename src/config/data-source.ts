import 'reflect-metadata'
import { join } from 'path'
import { DataSource } from 'typeorm'
import 'dotenv/config'

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [join(__dirname, '../entities/**/*{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*.ts')],
  subscribers: [],
})
