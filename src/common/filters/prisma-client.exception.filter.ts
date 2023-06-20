import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ErrorResponse } from '../interfaces/error-response.interface';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const errorLookup: Record<string, { status: number; message: string }> = {
      P2025: { status: 404, message: 'Record not found' },
      P2002: {
        status: 400,
        message: 'A record with the same key already exists',
      },
      P2003: { status: 400, message: 'The relation does not exist' },
      P2016: { status: 400, message: 'The required value is null' },
    };

    const { status = 500, message = 'An unexpected error occurred' } =
      errorLookup[exception.code] || {};

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      url: req.url,
      message,
    };

    this.logger.error(JSON.stringify(errorResponse));

    res.status(status).json(errorResponse);
  }
}
