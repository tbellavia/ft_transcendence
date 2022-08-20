import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './class/user.class';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }

  async create(createUserDto: CreateUserDTO) {
      const { username, password } = createUserDto;
      const user = UserEntity.create({
          username,
          password
      });

      console.log(`Created user ${createUserDto}`);
      await user.save();
  }

  async update(updateUserDto: UpdateUserDTO, user_id: string) {
    const { password } = updateUserDto;
    const user = await this.find(user_id);

    if ( user == null )
      return;
    user.password = password;
    await user.save();
  }

  async find(user_id: string) {
    const user = await this.userRepository.findOne({
      where: {
        user_id
      }
    });
    return user;
  }

  /* Lylian's code */
  findUser(userID: number) {
    return this.users.find((user) => user.id == userID);
  }

  createUser(user: User) {
    console.log('Add: ', user);
    this.users.push(user);
    console.log('Users:', this.users);
    return user;
  }
}
