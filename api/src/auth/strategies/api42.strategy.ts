import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class Api42Strategy extends PassportStrategy(Strategy, 'api42') {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    config: ConfigService,
  ) {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: config.get<string>('API_UID'),
      clientSecret: config.get<string>('API_SECRET'),
      callbackURL: config.get<string>('API_CALLBACK_URL'),
    });
  }

  // Create or find user using data fetch from 42api with the new token
  async validate(accessToken: string) {
    // Fetch data from 42api
    const { data: user42Datas } = await firstValueFrom(
      this.httpService.get('http://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    return this.authService.api42LoginOrRegister(user42Datas);
  }
}
