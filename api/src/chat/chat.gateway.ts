import { UseFilters } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SocketService } from "src/socket/socket.service";
import { WsExceptionFilter } from "./filters/wsException.filter";

@UseFilters(new WsExceptionFilter())
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
      socket.join(user.user_id);
    } catch (exception: any) {
      //TODO: send error as response ?
      //Silently ignores error, when client will make a request the filter will work :)
    }
  }

}