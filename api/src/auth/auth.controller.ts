import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('api42')
  @UseGuards(AuthGuard('api42'))
  log42Api() {
    return 'Connection completes';
  }
}
