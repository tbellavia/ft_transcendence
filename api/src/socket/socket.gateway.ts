import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { SocketService } from "./socket.service";
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true
  }
})
export class SocketGateway implements OnGatewayConnection {
  constructor(
    private readonly socketService: SocketService
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const user = await this.socketService.getUserFromSocket(socket);
      socket.join(user.username);
    } catch (exception: any) {
      socket.emit('exception', {
        status: 'error',
        exception: 'Failed to connect'
      });
    }
  }
}