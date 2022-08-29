import { Controller, Get, Request } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Controller('')
export class AppController {
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
