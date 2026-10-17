import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from '@api/database';
import { FeedbackModule } from './feedback/feedback.module';
import { BlogModule } from './blog/blog.module';
import { TerminalModule } from './terminal/terminal.module';
import { ProjectsModule } from './projects/projects.module';
import { HealthModule } from './health/health.module';
import { ComparisonsModule } from './comparisons/comparisons.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true
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
    HealthModule,
    ComparisonsModule,
    SkillsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
