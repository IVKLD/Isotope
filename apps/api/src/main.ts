import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './core/filters/http-exception.filter';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const allowedOrigins = process.env['CORS_ORIGIN']
    ? process.env['CORS_ORIGIN'].split(',').map(origin => origin.trim())
    : ['http://localhost:4200', 'http://localhost:3000'];

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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

  // Swagger OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Enterprise Backend API for IgnI Portfolio (Blog, Feedback, Terminal, Metrics)')
    .setVersion('1.0.0')
    .addTag('Health', 'System and database diagnostics')
    .addTag('Feedback', 'Contact requests and inquiries')
    .addTag('Blog', 'Post telemetry, views counter & reactions')
    .addTag('Terminal', 'Interactive shell command execution')
    .addTag('Projects', 'Bento grid projects metadata & stats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Portfolio API Documentation — Swagger UI'
  });

  const port = process.env['PORT'] || 3000;
  await app.listen(port);

  logger.log(`Portfolio API server is running on: http://localhost:${port}`);
  logger.log(`Swagger OpenAPI docs available at: http://localhost:${port}/api/docs`);
  logger.log(`Health check accessible at: http://localhost:${port}/health`);
}

bootstrap();
