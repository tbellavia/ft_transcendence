import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * The public route for authentication with 42api oauth2
   * Use AuthGuard api42 strategy then setup server-side cookie with
   * newly JWT forged for the session
   * @param req
   * @returns
   */
  @Public()
  @Get('api42')
  @UseGuards(AuthGuard('api42'))
  log42Api(@Request() req, @Res({ passthrough: true }) res) {
    res.cookie('jwtAuth', this.authService.login(req.user), {
      httpOnly: true,
    });
  }
}
