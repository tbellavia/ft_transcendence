import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    super({
      // Get JWT from cookie inside request
      jwtFromRequest: (request) => {
        let token = null;
        console.log(request.cookies)
        if (request && request.cookies) token = request.cookies['jwtAuth'];
        console.log('TOKEN: ', token);
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  // Populate req.user with valid decoded payload
  async validate(payload: any) {
    return { id: payload.id, login: payload.login };
  }
}
