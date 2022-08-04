import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from '../auth.service';

@Injectable()
export class Api42Strategy extends PassportStrategy(Strategy, 'api42') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: config.get<string>('API_UID'),
      clientSecret: config.get<string>('API_SECRET'),
      callbackURL: config.get<string>('API_CALLBACK_URL'),
    });
  }

  async validate(accessToken: string) {
    return await this.authService.validate(accessToken);
  }
}
