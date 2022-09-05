import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './interfaces/tokenPayload.interface';

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
  async findOrCreateUser(username: string) {
    const user: UserEntity | undefined = await this.userService.findOne(username)
    if (user) return user;
    return await this.userService.create({ username });
  }

  /**
   * This function returns the JWT token that identified the user
   * and permits to retreived it in database
   * @param user the user object (TODO: replace it by db calls or api calls)
   * @returns a string containing the token encoded
   */
  async login(user: UserEntity, isTwoFactorAuthenticated = false) {
    const payload: TokenPayload = {
      username: user.username,
      uuid: user.user_id,
      isTwoFactorAuthenticated
    };

    return await this.jwtService.sign(payload);
  }
}
