import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe())

  // Config service
  const configService = app.get(ConfigService)

  // Swagger
  if (configService.get<string>('NODE_ENV') === 'development') {
    const configSwagger = new DocumentBuilder().setTitle('DefiMap Backend').setVersion('1.0').build()
    const document = SwaggerModule.createDocument(app, configSwagger)
    SwaggerModule.setup(`api/swagger`, app, document)
  }

  await app.listen(configService.get<number>('PORT') || 8080)
}
bootstrap()
