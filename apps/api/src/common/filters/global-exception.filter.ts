import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctxType = host.getType();
    let response: any;
    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      response = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      response = { message };
    }

    this.logger.error(`Status: ${status} Error: ${JSON.stringify(response)}`);

    if (ctxType === 'http') {
      const res = host.switchToHttp().getResponse();
      res.status(status).json(response);
    } else if (ctxType === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      throw new HttpException(response, status);
    }
  }
}
