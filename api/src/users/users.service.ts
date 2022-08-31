import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, UsingJoinColumnIsNotAllowedError } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { selectUserOption } from './options/user-select.option';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }

  async create(createUserDto: CreateUserDTO) {
      const { username } = createUserDto;
      const user = UserEntity.create({ username });

      console.log(`Created user ${ user }`);
      await user.save();
      return await this.find(user.user_id);
  }

  /**
   * Update two factor secret shared by applications
   * @param two_factor_secret the new secret
   * @param user_id the user id that stores the secret
   * @returns n/a
   */

  async updateTwoFactorSecret(two_factor_secret: string, user_id: string) {
    const user = await this.find(user_id);

    if (user == null)
      return ;

    user.two_factor_auth_secret = two_factor_secret;
    await user.save();
  }

  async turnOnTwoFactorAuth(user_id: string) {
    return this.update({
      is_two_factor_auth_enabled: true
    }, user_id);
  }

  async update(updateUserDto: UpdateUserDTO, user_id: string) {
    const { password, is_two_factor_auth_enabled } = updateUserDto;
    const user = await this.find(user_id);

    if ( user == null )
      return;
    user.two_factor_auth_secret = password;
    user.is_two_factor_auth_enbaled = is_two_factor_auth_enabled;
    await user.save();
  }

  async find(user_id: string) {
    const user = await this.userRepository.findOne({
      where: {
        user_id
      },
      select: selectUserOption
    });
    return user;
  }

  async findByName(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username
      },
      select: selectUserOption
    });
    return user;
  }

  async findAll(limit?: number | undefined) {
    const options: FindManyOptions<UserEntity> = {
      select: selectUserOption,
      order: {
        user_id: "ASC"
      }
    }
    if ( limit !== undefined )
      options["take"] = limit;
    return await this.userRepository.find(options);
  }

  async findOne(user_id: string) {
    return await this.userRepository.findOne({
      where: {
        user_id
      },
      select: selectUserOption
    });
  }

  async delete(user_id: string){
    await this.userRepository.delete(user_id);
  }

}
