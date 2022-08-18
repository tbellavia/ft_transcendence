import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('')
  getIndex(): string {
    return "";
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
