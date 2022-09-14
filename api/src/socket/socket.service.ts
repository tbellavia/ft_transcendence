import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";
import { parse } from "cookie";
import { UsersService } from "src/users/users.service";
import { WsUserNotFoundException } from "src/chat/exceptions/wsUserNotFound";

@Injectable()
export class SocketService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  async getUserFromSocket(socket: Socket) {
    const cookies = socket.handshake.headers.cookie;
    const { Authentication: token } = parse(cookies);
    const user = await this.authService.getUserFromAuthenticationToken(token);
    if (!user)
      throw new WsException('Invalid credentials');
    return user;
  }

  // Interface for throwing appropriate error ;-)
  async getUserByName(username: string) {
    try {
      return await this.userService.findOneByName(username);
    } catch(error) {
      throw new WsUserNotFoundException(username);
    }
  }
}