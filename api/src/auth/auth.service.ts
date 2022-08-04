import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/users/class/user.class';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly http: HttpService,
  ) {}

  async validate(accessToken: string) {
    const { data } = await firstValueFrom(
      this.http.get('http://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    let user: User | undefined = this.userService.findUser(data.id);
    if (!user) {
      user = new User();
      for (const property in user) {
        user[property] = data[property];
      }

      return this.userService.createUser(user);
    }
    return user;
  }
}
