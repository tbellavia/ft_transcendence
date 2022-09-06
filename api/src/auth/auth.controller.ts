import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RequestWithUser } from './interfaces/requestWithUser.interface';

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
  async log42Api(@Request() req: RequestWithUser, @Res({ passthrough: true }) res) {
    res.cookie('Authentication', await this.authService.login(req.user), {
      httpOnly: true,
    });
  }

  /**
   * Clear the session cookie from server
   * @param res the response object for clearing the cookie
   */
  @Get('disconnect')
  disconnectCookie(@Res({ passthrough: true }) res) {
    res.clearCookie('Authentication')
  }

  /**
   * Just an auth endpoint to check if client is connected or not
   * return status code 200 if true, 401 unauthorize if not
   */
  @Get('isConnected')
  isConnected() {
  }
}
