import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../interfaces/error-response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const httpException =
      exception instanceof HttpException
        ? exception
        : new InternalServerErrorException();

    const statusCode = httpException.getStatus();
    const message =
      typeof httpException === 'string' ? httpException : httpException.message;

    const errorResponse: ErrorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      url: req.url,
      message,
    };

    this.logger.error(JSON.stringify(errorResponse));
    res.status(statusCode).json(errorResponse);
  }
}
