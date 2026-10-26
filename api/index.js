'use strict';
require('reflect-metadata');
const express = require('express');
const path = require('path');

const server = express();
let serverPromise = null;

async function bootstrap() {
  const { NestFactory } = await import('@nestjs/core');
  const { ExpressAdapter } = await import('@nestjs/platform-express');
  const { ValidationPipe } = await import('@nestjs/common');

  const appModulePath = path.resolve(process.cwd(), 'dist/apps/backend/app/app.module.js');
  const filterPath = path.resolve(process.cwd(), 'dist/apps/backend/core/filters/http-exception.filter.js');
  const interceptorPath = path.resolve(process.cwd(), 'dist/apps/backend/core/interceptors/logging.interceptor.js');

  const { AppModule } = await import(appModulePath);
  const { GlobalExceptionFilter } = await import(filterPath);
  const { LoggingInterceptor } = await import(interceptorPath);

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

module.exports = async function handler(req, res) {
  try {
    if (!serverPromise) {
      serverPromise = bootstrap();
    }
    await serverPromise;

    if (req.query && req.query.path) {
      const pathParam = Array.isArray(req.query.path)
        ? req.query.path.join('/')
        : req.query.path;
      delete req.query.path;

      const urlObj = new URL(req.url, 'http://localhost');
      urlObj.searchParams.delete('path');
      const search = urlObj.search;

      req.url = `/api/${pathParam}${search}`;
    }

    server(req, res);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('SERVERLESS BOOTSTRAP ERROR:', error.stack || error.message);
    res.status(500).json({
      statusCode: 500,
      error: 'Serverless Bootstrap Failed',
      message: error.message
    });
  }
};
