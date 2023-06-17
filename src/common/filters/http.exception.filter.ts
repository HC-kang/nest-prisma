import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NotFoundError } from 'rxjs';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(exception);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    if (exception instanceof NotFoundError) {
      this.logger.error(`Not found error: ${exception.message}`);
      res.status(404).json({ message: exception.message });
      return;
    }

    if (exception instanceof NotFoundException) {
      this.logger.error(`Not found exception: ${exception.message}`);
      res.status(404).json({ message: exception.message });
      return;
    }

    if (exception instanceof BadRequestException) {
      this.logger.error(`Bad request exception: ${exception.message}`);
      res.status(400).json({ message: exception.message });
      return;
    }

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();

    const log = {
      url: req.url,
      response,
    };

    this.logger.error(JSON.stringify(log));

    res.status((exception as HttpException).getStatus());
    res.json(response);
  }
}
