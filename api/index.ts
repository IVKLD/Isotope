import 'reflect-metadata';
import type { Request, Response } from 'express';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../dist/apps/backend/app/app.module';
import { GlobalExceptionFilter } from '../dist/apps/backend/core/filters/http-exception.filter';
import { LoggingInterceptor } from '../dist/apps/backend/core/interceptors/logging.interceptor';

const server = express();
let serverPromise: Promise<void> | null = null;

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
}

export default async function handler(req: Request, res: Response): Promise<void> {
  try {
    if (!serverPromise) {
      serverPromise = bootstrap();
    }
    await serverPromise;
    server(req, res);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('SERVERLESS BOOTSTRAP ERROR:', error.stack || error.message);
    res.status(500).json({
      statusCode: 500,
      error: 'Serverless Bootstrap Failed',
      message: error.message
    });
  }
}
