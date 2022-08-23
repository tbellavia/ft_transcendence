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

  /**
   * Create or find a user in the db
   * @param toFind The schema used to find the user or create it
   * @returns the user found in db or a new user
   */
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

  /**
   * This function returns the JWT token that identified the user
   * and permits to retreived it in database
   * @param user the user object (TODO: replace it by db calls or api calls)
   * @returns a string containing the token encoded
   */
  async login(user: User) {
    const payload = { login: user.login, id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
