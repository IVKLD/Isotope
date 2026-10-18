import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE, DrizzleDb, feedbackTable } from '@backend/database';
import { CreateFeedbackDto } from './feedback.dto';
import { FeedbackRdo } from '@isotope/contracts';

@Injectable()
export class FeedbackService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  public async processFeedback(dto: CreateFeedbackDto): Promise<FeedbackRdo> {
    await this.db.insert(feedbackTable).values({
      name: dto.name,
      contact: dto.contact,
      message: dto.message,
      source: dto.source || 'web-form'
    });

    return {
      success: true,
      message: 'Сообщение успешно отправлено.'
    };
  }
}
