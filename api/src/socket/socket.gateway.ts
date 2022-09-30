import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import { SocketService } from "./socket.service";
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true
  }
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly socketService: SocketService
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const user = await this.socketService.getUserFromSocket(socket);
      socket.join(user.username);
    } catch {}
  }

  async handleDisconnect(socket: Socket) {
    this.socketService.disconnectSocketBindedToUser(socket);
  }
}