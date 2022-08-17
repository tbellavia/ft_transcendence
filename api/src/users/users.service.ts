import { Injectable } from '@nestjs/common';
import { User } from './class/user.class';

@Injectable()
export class UsersService {
  private users: User[] = [];

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
