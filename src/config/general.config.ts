export const generalConfig = () => ({
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  defaultDBOptions: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  redis: {
    host: process.env.REDIS_HOST,
    authPass: process.env.REDIS_AUTH_PASS,
    port: 6379,
    ttl: 60 * 60 * 24,
  },
})
