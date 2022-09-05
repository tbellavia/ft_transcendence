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
      return await this.findOne(user.username);
  }

  /**
   * Update two factor secret shared by applications
   * @param two_factor_secret the new secret
   * @param username the username that stores the secret
   * @returns n/a
   */

  async updateTwoFactorSecret(two_factor_secret: string, username: string) {
    const user = await this.findOne(username);

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

  async update(updateUserDto: UpdateUserDTO, username: string) {
    const { password, is_two_factor_auth_enabled } = updateUserDto;
    const user = await this.findOne(username);
    
    console.log(password, is_two_factor_auth_enabled);
    // Todo send appropriate error
    if ( user == null )
      return;
    if ( password !== undefined )
      user.two_factor_auth_secret = password;
    if ( is_two_factor_auth_enabled !== undefined )
      user.is_two_factor_auth_enbaled = is_two_factor_auth_enabled;
    
    await user.save();
    return await this.findOne(username);
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

  async findOne(username: string) {
    return await this.userRepository.findOne({
      where: {
        username
      },
      select: selectUserOption
    });
  }

  async delete(username: string){
    const user = await this.findOne(username);

    if ( user == null )
      return { msg: "User not found!" };
    await user.remove();
    return { msg: "User successfuly removed" };
  }

}
