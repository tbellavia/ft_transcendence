import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { userInfo } from "os";
import { Server, Socket } from 'socket.io';
import { SocketService } from "src/socket/socket.service";
import { SendMessageDTO } from "./dto/sendMessage.dto";

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: true,
    credentials: true
  }
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  constructor(
    private readonly socketService: SocketService
  ) {}

  //Be aware filters does not works on handleConnection !
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

  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: SendMessageDTO,
    callback
  ) {
    const user = await this.socketService.getUserFromSocket(socket);


    const sockets = await this.server.to(message.target).fetchSockets();
    if (!sockets.length) {
      throw new WsException(`${message.target} not connected`);
    }

    this.server
      .to(message.target)
      .emit('receive_message', {
        message: message.message,
        from: user.username
      });
    return '';
  }
}