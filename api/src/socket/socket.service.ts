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
  private userStatus = new Map<string, UserStatus>();

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
    socket.join(user.username);

    /*
    console.log('User', user.username, 'connect');
    this.connectedUsers.forEach((user, socketId) => {
      console.log(socketId, ':',user.username)
    });
    */
    return user;
  }

  async disconnectSocketBindedToUser(socket: Socket) {
    const user = this.connectedUsers.get(socket.id);
    this.connectedUsers.delete(socket.id);
    /*
    if (user)
      console.log('User', user.username, 'disconnect');
    */
    return user;
  }

  // Fetch user
  async getUserFromSocket(socket: Socket) {
    const user = this.connectedUsers.get(socket.id);
    if (!user)
      return this.connectUserWithSocket(socket);
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
  getUserStatus(socket: Socket) {
    // const user = 
  }

  setUserStatus(socket: Socket, status: UserStatus) {
    // const user = 
  } 
}