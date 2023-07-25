import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { strings } from '../resources/strings';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const errorLookup: Record<string, { status: number; message: string }> = {
      P2025: { status: 404, message: strings.common.errors.notFound },
      P2002: {
        status: 400,
        message: strings.common.errors.alreadyExists,
      },
      P2003: {
        status: 400,
        message: strings.common.errors.relationDoesNotExist,
      },
      P2016: {
        status: 400,
        message: strings.common.errors.requiredValueIsNull,
      },
    };

    const { status = 500, message = strings.common.errors.unexpectedError } =
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
