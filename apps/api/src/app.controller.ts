import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): { message: string } {
    return {
      message:
        'Weather Ranking API is live and working. This is a GraphQL API. Please use the /graphql endpoint to interact with it.',
    };
  }
}
