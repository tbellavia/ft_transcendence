import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { parse } from 'cookie';
import { WsException } from "@nestjs/websockets";

@Injectable()
export class ChatService {
  constructor(
    private authService: AuthService
  ) {}

  async getUserFromSocket(socket: Socket) {
    const cookies = socket.handshake.headers.cookie;
    const { jwtAuth: token } = parse(cookies);
    const user = await this.authService.getUserFromAuthenticationToken(token);
    if (!user)
      throw new WsException('Invalid credentials');
    return user;
  }
}