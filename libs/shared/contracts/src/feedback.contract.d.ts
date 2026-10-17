export type FeedbackSource = 'web-form' | 'terminal';

export type CreateFeedbackDto = {
  name: string;
  contact: string;
  message: string;
  source?: FeedbackSource;
};

export type FeedbackRdo = {
  success: boolean;
  message: string;
  ticketId?: string;
};
