import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/class/user.class';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async findOrCreateUser(toFind: any) {
    let user: User | undefined = this.userService.findUser(toFind.id);
    if (!user) {
      user = new User();
      for (const property in user) {
        user[property] = toFind[property];
      }

      return this.userService.createUser(user);
    }
    return user;
  }

  async login(user: User) {
    const payload = { login: user.login, id: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
