import { Injectable } from '@nestjs/common';
import { User } from 'src/users/class/user.class';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

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
}
