import 'reflect-metadata';
import type { Request, Response } from 'express';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../apps/backend/src/app/app.module';
import { GlobalExceptionFilter } from '../apps/backend/src/core/filters/http-exception.filter';
import { LoggingInterceptor } from '../apps/backend/src/core/interceptors/logging.interceptor';

const server = express();
let isInitialized = false;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: true
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.init();
  isInitialized = true;
}

export default async function handler(req: Request, res: Response): Promise<void> {
  if (!isInitialized) {
    await bootstrap();
  }
  server(req, res);
}
