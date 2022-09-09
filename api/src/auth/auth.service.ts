import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { Api42UserDatas } from './interfaces/api42UserDatas.interface';
import { PasswordAuthDTO } from './dto/passwordAuth.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/database/postgresErrorCode.enum';
import { UserNotFoundException } from 'src/users/exceptions/userNotFound.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async api42LoginOrRegister(user42: Api42UserDatas) {
    try {
      const user = await this.userService.findUser42Registered(user42);
      return user;
    }
    catch (error) {
      if (error instanceof UserNotFoundException)
        return await this.userService.create({
          username: user42.login,
          user42_id: user42.id
        });
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getUserFromAuthenticationToken(token: string ) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET')
    });
    if (payload.uuid) {
      return await this.userService.findOneById(payload.uuid);
    }
  }

  async registerUserPassword(passwordAuth: PasswordAuthDTO) {
    const hashedPassword = await bcrypt.hash(passwordAuth.password, 10);
    try {
      const user = await this.userService.create({
        ...passwordAuth,
        password: hashedPassword 
      });
      return user;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        throw new BadRequestException('User with that username already exists');
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async validateUserPassword(passwordAuth: PasswordAuthDTO) {
    try {
      const user = await this.userService.findOneByName(passwordAuth.username);
      await this.verifyPassword(passwordAuth.password, user.password);
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async verifyPassword(password: string, hashedPassword) {
    const isValidate = await bcrypt.compare(password, hashedPassword);
    if (!isValidate)
      throw new BadRequestException('Invalid credentials');
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
