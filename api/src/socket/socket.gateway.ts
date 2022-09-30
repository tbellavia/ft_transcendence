import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { SocketService } from "./socket.service";
import { Socket } from 'socket.io';
import { UserStatus } from "./enums/userStatus.enum";

@WebSocketGateway({
  // namespace: '/',
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
			this.socketService.setUserStatus(socket, UserStatus.ONLINE);
    } catch {}
  }

  async handleDisconnect(socket: Socket) {
    this.socketService.disconnectSocketBindedToUser(socket);
  }

  @SubscribeMessage('get_status')
  async getUserStatus(
    @MessageBody() username: string
  ) {
    const user = await this.socketService.getUserByName(username);
    return this.socketService.getUserStatus(user);
  }
}