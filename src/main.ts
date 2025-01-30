import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const prefix : string = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(prefix)
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const apiConfig = new DocumentBuilder()
    .setTitle('BeGO v1 API')
    .setDescription('Backend test')
    .setVersion('1.0')
    .build();

  const swagger = SwaggerModule.createDocument(app, apiConfig);

  SwaggerModule.setup(prefix, app, swagger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
