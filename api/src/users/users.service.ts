import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Api42UserDatas } from "../auth/interfaces/api42UserDatas.interface";
import { FindManyOptions, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { selectUserOption } from "./options/user-select.option";
import { UserNotFoundException } from "./exceptions/userNotFound.exception";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const user = UserEntity.create({ ...createUserDto });

    await user.save();
    return await this.findOneByName(user.username);
  }

  /**
   * Update two factor secret shared by applications
   * @param two_factor_secret the new secret
   * @param username the username that stores the secret
   * @returns n/a
   */

  async updateTwoFactorSecret(two_factor_secret: string, username: string) {
    const user = await this.findOneByName(username);

    if (user == null) return;

    user.two_factor_auth_secret = two_factor_secret;
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
    
    async update(updateUserDto: UpdateUserDTO, username: string) {
      const { password, is_two_factor_auth_enabled } = updateUserDto;
      const user = await this.findOneByName(username);
      
      if (password !== undefined)
        user.two_factor_auth_secret = password;
      if (is_two_factor_auth_enabled !== undefined)
        user.is_two_factor_auth_enbaled = is_two_factor_auth_enabled;

      await user.save();
      return await this.findOneByName(username);
    }

  async findAll(limit?: number | undefined) {
    const options: FindManyOptions<UserEntity> = {
      select: selectUserOption,
      order: {
        user_id: "ASC",
      },
    };
    if (limit !== undefined) options["take"] = limit;
    return await this.userRepository.find(options);
  }
  
  async findOneById(user_id: string) {
    const user = await this.userRepository.findOne({
      where: {
        user_id,
      },
      select: selectUserOption,
    });
    if (!user)
      throw new UserNotFoundException(user_id);
    return user;
  }


  async findOneByName(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      select: selectUserOption,
    });
    if (!user) throw new UserNotFoundException(username);
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

  async delete(username: string) {
    const user = await this.findOneByName(username);
    await user.remove();
  }
}
