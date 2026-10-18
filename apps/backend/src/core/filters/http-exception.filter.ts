import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null;

    let message: string | string[] = 'Internal server error';

    if (status >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} >> ${status} Exception: ${
          exception instanceof Error ? exception.stack : JSON.stringify(exception)
        }`
      );
    } else {
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        exceptionResponse &&
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        const respMsg = exceptionResponse.message;
        if (typeof respMsg === 'string') {
          message = respMsg;
        } else if (Array.isArray(respMsg)) {
          message = respMsg.map(String);
        }
      } else if (exception instanceof Error) {
        message = exception.message;
      }

      this.logger.warn(
        `[${request.method}] ${request.url} >> ${status} Client error: ${JSON.stringify(message)}`
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message
    });
  }
}
