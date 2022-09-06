import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { Api42UserDatas } from './interfaces/api42UserDatas.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async api42LoginOrRegister(user42: Api42UserDatas) {
    const user : UserEntity | undefined = await this.userService.findUser42Registered(user42);

    if (!user) {
      return await this.userService.create({
        username: user42.login,
        user42_id: user42.id
      });
    }
    return user;
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
