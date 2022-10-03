import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";
import { parse } from "cookie";
import { UsersService } from "src/users/users.service";
import { WsUserNotFoundException } from "./exceptions/wsUserNotFound";
import { UserEntity } from "src/users/entities/user.entity";
import { WsUserNotConnected } from "./exceptions/wsUserNotConnected";
import { UserStatus } from "./enums/userStatus.enum";

@Injectable()
export class SocketService {
  // Map of connected users to their sockets.id
  private connectedUsers = new Map<string, UserEntity>();
  private usersStatus = new Map<string, UserStatus>();
  private userSockets = new Map<string, Socket[]>();
  private statusTimeout = new Map<string, NodeJS.Timeout>();

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  // Connect and disconnect user
  async connectUserWithSocket(socket: Socket) {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies)
      throw new WsUserNotConnected();
    const { Authentication: token } = parse(cookies);
    if (!token)
      throw new WsUserNotConnected();
    const user = await this.authService.getUserFromAuthenticationToken(token);
    if (!user)
      throw new WsException('Invalid credentials');
    
    this.connectedUsers.set(socket.id, user);


    let socketArray = this.userSockets.get(user.username);
    if (socketArray)
      socketArray.push(socket);
    else
      socketArray = [socket];
    this.userSockets.set(user.username, socketArray);
    socket.join(user.username);

    return user;
  }

  async disconnectSocketBindedToUser(socket: Socket) {
    const user = this.connectedUsers.get(socket.id);
    if (user) {
      this.connectedUsers.delete(socket.id);
      this.usersStatus.delete(user.username);

      let array = this.userSockets.get(user.username);
      if (array && array.length > 1) {
        const index = array.findIndex(userSocket => userSocket.id == socket.id);
        if (index != -1)
          array.splice(index, 1);
        this.userSockets.set(user.username, array);
      } else {
        this.userSockets.delete(user.username);
      }
    }
    return user;
  }

  // Fetch user
  async getUserFromSocket(socket: any) {
    const user = this.connectedUsers.get(socket.id);
    if (!user)
      return await this.connectUserWithSocket(socket);
    return user;
  }

  async getUserByName(username: string) {
    try {
      return await this.userService.findOneByName(username);
    } catch(error) {
      throw new WsUserNotFoundException(username);
    }
  }

  // Get and Set user's status
  getUserStatus(user: UserEntity): UserStatus {
    let status = UserStatus.OFFLINE;
    if (this.usersStatus.has(user.username))
      status = this.usersStatus.get(user.username);
    return status;
  }

  async setUserStatus(socket: Socket, status: UserStatus) {
    const user = await this.getUserFromSocket(socket);
    this.usersStatus.set(user.username, status);
    if (this.statusTimeout.has(user.username)) {
      clearTimeout(this.statusTimeout.get(user.username));
    }
    this.statusTimeout.set(user.username, setTimeout(() => {
      if (this.usersStatus.has(user.username)) {
        this.usersStatus.set(user.username, UserStatus.ONLINE);
      }
    }, 5000));
  } 

  getSocketsFromUsername(username: string) {
    return this.userSockets.get(username);
  }
}