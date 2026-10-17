const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { ValidationPipe } = require('@nestjs/common');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
const { AppModule } = require('../dist/apps/api/app/app.module');
const { GlobalExceptionFilter } = require('../dist/apps/api/core/filters/http-exception.filter');
const { LoggingInterceptor } = require('../dist/apps/api/core/interceptors/logging.interceptor');

const server = express();
let isInitialized = false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: {
      origin: true,
      credentials: true
    }
  });

  app.setGlobalPrefix('api', {
    exclude: ['health']
  });

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Enterprise Backend API for IgnI Portfolio (Blog, Feedback, Terminal, Metrics)')
    .setVersion('1.0.0')
    .addTag('Health', 'System and database diagnostics')
    .addTag('Feedback', 'Contact requests and inquiries')
    .addTag('Blog', 'Blog posts, reader reactions & telemetry')
    .addTag('Terminal', 'Interactive shell command execution')
    .addTag('Projects', 'Portfolio projects catalog, categories & engineering breakdown')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    customSiteTitle: 'Portfolio API Documentation — Swagger UI'
  });

  await app.init();
  isInitialized = true;
}

module.exports = async (req, res) => {
  if (!isInitialized) {
    await bootstrap();
  }
  server(req, res);
};
