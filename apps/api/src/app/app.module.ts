import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from '@api/database';
import { FeedbackModule } from './feedback/feedback.module';
import { BlogModule } from './blog/blog.module';
import { TerminalModule } from './terminal/terminal.module';
import { ProjectsModule } from './projects/projects.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local']
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 120
      }
    ]),
    DatabaseModule,
    FeedbackModule,
    BlogModule,
    TerminalModule,
    ProjectsModule,
    HealthModule
  ]
})
export class AppModule {}
