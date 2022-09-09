import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Api42UserDatas } from "../auth/interfaces/api42UserDatas.interface";
import { FindManyOptions, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { selectUserOption } from "./options/user-select.option";
import { UserNotFoundException } from "./exceptions/userNotFound.exception";
import * as path from "path";
import { readFile, readFileSync } from "fs";

const STATIC_DIR = path.join(path.resolve(__dirname, ".."), "static"); 

@Injectable()
export class UsersService {
  static default_avatar: Buffer = readFileSync(path.join(STATIC_DIR, "avatar.default.png"));

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) 
  { }

  async create(createUserDto: CreateUserDTO) {
    const user = this.userRepository.create({
      ...createUserDto, 
      avatar: UsersService.default_avatar
    });

    await this.userRepository.save(user);
    return await this.findOneByName(user.username);
  }
  
  /**
   * Add avatar to user
   * @param username username of user
   * @param avatar the new avatar to change
   * @returns UserEntity
   */
  async addAvatar(username: string, avatar: Buffer) {
    const user = await this.findOneByName(username);

    user.avatar = avatar;
    await user.save();
    return user;
  }

  /**
   * Return the avatar byte buffer
   * @param username username of user
   * @returns avatar buffer
   */
  async getAvatar(username: string) {
    const user = await this.findOneByName(username);

    return user.avatar;
  }

  /**
   * Update two factor secret shared by applications
   * @param two_factor_secret the new secret
   * @param username the username that stores the secret
   * @returns n/a
   */

  async updateTwoFactorSecret(two_factor_secret: string, user_id: string) {
    const user = await this.findOneById(user_id);
    user.two_factor_auth_secret = two_factor_secret;
    user.is_two_factor_auth_enabled = true;
    await user.save();
  }

  /**
   * Change avatar of the user
   * @param username the user username
   * @param avatar the new avatar to change
   */
  async changeAvatar(username: string, avatar: Buffer) {
    const user = await this.findOneByName(username);

    user.avatar = avatar;
    await user.save();
  }

  async turnOnTwoFactorAuth(user_id: string) {
    return this.update(
      {
        is_two_factor_auth_enabled: true,
      },
      user_id
      );
    }
    
    async update(updateUserDto: UpdateUserDTO, user_id: string) {
      const { password, is_two_factor_auth_enabled } = updateUserDto;
      const user = await this.findOneById(user_id);
      
      if (password !== undefined)
        user.two_factor_auth_secret = password;
      if (is_two_factor_auth_enabled !== undefined)
        user.is_two_factor_auth_enabled = is_two_factor_auth_enabled;

      await user.save();
      return await this.findOneById(user_id);
    }

  async findAll(limit?: number | undefined) {
    const options: FindManyOptions<UserEntity> = {
      order: {
        user_id: "ASC",
      },
    };
    if (limit !== undefined) options["take"] = limit;
    return await this.userRepository.find(options);
  }
  
  async findOneById(user_id: string) {
    const user = await this.userRepository.findOneBy({ user_id });
    if (!user)
      throw new UserNotFoundException(user_id);
    return user;
  }


  async findOneByName(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user)
      throw new UserNotFoundException(username);
    return user;
  }

  async findUser42Registered(user42Datas: Api42UserDatas) {
    const user = await this.userRepository.findOneBy([
      { username: user42Datas.login },
      { user42_id: user42Datas.id },
    ]);
    if (!user)
      throw new UserNotFoundException(user42Datas.login);
    return user;
  }

  async delete(user_id: string) {
    const user = await this.findOneById(user_id);
    await user.remove();
  }
}
