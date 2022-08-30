import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
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
  async findOrCreateUser(userName: string) {
    let user: UserEntity | undefined = await this.userService.findByName(userName)
    if (!user) {
      const userDTO = new CreateUserDTO();
      userDTO.username = userName;
      return this.userService.create(userDTO);
    }
    return user;
  }

  /**
   * This function returns the JWT token that identified the user
   * and permits to retreived it in database
   * @param user the user object (TODO: replace it by db calls or api calls)
   * @returns a string containing the token encoded
   */
  async login(user: UserEntity) {
    const payload = {username: user.username, id: user.user_id};
    return await this.jwtService.sign(payload);
  }
}
