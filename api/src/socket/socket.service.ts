import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";
import { parse } from "cookie";

@Injectable()
export class SocketService {
  constructor(
    private readonly authService: AuthService
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