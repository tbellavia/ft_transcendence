import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';

@Injectable()
export class JWTTwoFactorStrategy extends PassportStrategy(Strategy, 'jwt-two-factor') {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      // Get JWT from cookie inside request
      jwtFromRequest: (request) => {
        let token = null;
        if (request && request.cookies) token = request.cookies['Authentication'];
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  // Populate req.user with user's entity
  async validate(payload: TokenPayload) {
    const user = await this.userService.findOneById(payload.uuid);
    if (!user.double_auth_enabled)
      return user;
    if (payload.isTwoFactorAuthenticated)
      return user;
  }
}
