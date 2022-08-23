import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("/api/v1");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await app.listen(3000);
}
bootstrap();
