import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from "../utils/decorators/user.decorator";
import { Api42Guard } from "./guards/api42.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('api42')
  @UseGuards(Api42Guard)
  log42Api(
    @User() user
  ) {
    return this.authService.login(user);
  }
}
