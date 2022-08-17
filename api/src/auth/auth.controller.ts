import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('api42')
  @UseGuards(AuthGuard('api42'))
  log42Api(@Request() req) {
    return this.authService.login(req.user);
  }
}
