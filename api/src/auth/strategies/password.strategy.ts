import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, 'password') {
  constructor(
    private readonly authService: AuthService
  ) {
    super();
  }

  async validate(username: string, password: string) {
    return this.authService.validateUserPassword({username, password});
  }
}