import { Controller, Get, Request } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { User } from "./common/decorators/user.decorator";

@Controller()
export class AppController {
  @Public()
  @Get('')
  getIndex(): string {
    return "";
  }

  @Get('profile')
  getProfile(@User() user) {
    return user;
  }
}
