'use strict';
require('reflect-metadata');
const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { ValidationPipe } = require('@nestjs/common');
const path = require('path');

const appModulePath = path.resolve(process.cwd(), 'dist/apps/backend/app/app.module');
const filterPath = path.resolve(process.cwd(), 'dist/apps/backend/core/filters/http-exception.filter');
const interceptorPath = path.resolve(process.cwd(), 'dist/apps/backend/core/interceptors/logging.interceptor');

const { AppModule } = require(appModulePath);
const { GlobalExceptionFilter } = require(filterPath);
const { LoggingInterceptor } = require(interceptorPath);

const server = express();
let serverPromise = null;

async function bootstrap() {
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
      const searchIndex = req.url.indexOf('?');
      const search = searchIndex !== -1 ? req.url.slice(searchIndex) : '';
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
