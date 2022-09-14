import { ClassSerializerInterceptor, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SocketService } from "src/socket/socket.service";
import { UserNotFoundException } from "src/users/exceptions/userNotFound.exception";
import { UsersService } from "src/users/users.service";
import { ChatService } from "./chat.service";
import { GetAllMessagesDTO } from "./dto/getAllMessages.dto";
import { SendMessageDTO } from "./dto/sendMessage.dto";
import { WsInternalError } from "./exceptions/wsInternalError";
import { WsUserNotFoundException } from "./exceptions/wsUserNotFound";
import { BlockedService } from "src/blocked/blocked.service";
import { WsBlockedByUserException } from "./exceptions/wsBlockedByUser.exception";

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  strategy: 'excludeAll'
})
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
    private readonly socketService: SocketService,
    private readonly userService: UsersService,
    private readonly chatService: ChatService,
    private blockedService: BlockedService
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
    @MessageBody() message: SendMessageDTO
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    const receiveMessage = await this.chatService.sendMessage(author, message);
    
    this.server
      .to(message.target)
      .emit('receive_message', receiveMessage);
    return author.username;
  }

  @SubscribeMessage('get_all_messages')
  async getAllMessagesOfAuthor(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getAllMessages: GetAllMessagesDTO
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    return this.chatService.getAllMessages(author, getAllMessages);
  }
}