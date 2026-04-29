import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctxType = host.getType();
    let response: Record<string, unknown>;
    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      const exResponse = exception.getResponse();
      response =
        typeof exResponse === 'string'
          ? { message: exResponse }
          : (exResponse as Record<string, unknown>);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      response = { message };
    }

    this.logger.error(`Status: ${status} Error: ${JSON.stringify(response)}`);

    if (ctxType === 'http') {
      const res = host.switchToHttp().getResponse<Response>();
      res.status(status).json(response);
    } else {
      throw new HttpException(response as Record<string, any>, status);
    }
  }
}
