import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './feedback.dto';
import type { FeedbackResponse } from '@portfolio/contracts';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Submit a contact inquiry or message' })
  @ApiResponse({ status: 200, description: 'Feedback successfully received and processed' })
  public async submitFeedback(@Body() dto: CreateFeedbackDto): Promise<FeedbackResponse> {
    return this.feedbackService.processFeedback(dto);
  }
}
