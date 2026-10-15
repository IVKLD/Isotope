export type FeedbackSource = 'web-form' | 'terminal';

export interface CreateFeedbackRequest {
  name: string;
  contact: string;
  message: string;
  source?: FeedbackSource;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  ticketId?: string;
}
