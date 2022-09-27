import { ClassSerializerInterceptor, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SocketService } from "src/socket/socket.service";
import { ChatService } from "./chat.service";
import { GetAllMessagesDTO } from "./dto/getAllMessages.dto";
import { SendMessageDTO } from "./dto/sendMessage.dto";
import { JoinChannelDTO } from "./dto/joinChannel.dto";
import { ChannelsService } from "./channels.service";
import { WsUserNotInChannelException } from "./exceptions/channel/wsUserNotInChannel.exception";
import { CreateChannelDTO } from "./dto/createChannel.dto";
import { InviteUserDTO } from "./dto/inviteUser.dto";
import { channel } from "diagnostics_channel";

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  strategy: 'excludeAll',
  exposeUnsetFields: false,
  excludeExtraneousValues: true
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
    private readonly chatService: ChatService,
    private readonly channelService: ChannelsService
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

  // Message handling
  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: SendMessageDTO
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    const receiveMessage = await this.chatService.sendMessage(author, message);

    // Notify every connected sockets of author that he has send message
    if (!message.isChannel)
      this.server
        .to(author.username)
        .emit('receive_message', receiveMessage);
    this.server
      .to(message.target)
      .emit('receive_message', receiveMessage);
    return author.username;
  }

  @SubscribeMessage('get_all_messages')
  async getAllMessages(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getAllMessages: GetAllMessagesDTO
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    const messages = await this.chatService.getAllMessages(author, getAllMessages);
    // Connect socket to channel's room
    if (getAllMessages.isChannel)
      this.server.to(author.username).socketsJoin(getAllMessages.target);
    return messages;
  }

  // Channel handling
  @SubscribeMessage('create_channel')
  async createChannel(
    @ConnectedSocket() socket: Socket,
    @MessageBody() channelAuth: CreateChannelDTO
  ) {
    const author = await this.socketService.getUserFromSocket(socket);

    const channel = await this.channelService.createChannel(author, channelAuth);
    this.server
      .to(author.username)
      .emit('receive_create_channel', channel.channelName);
  }

  @SubscribeMessage('join_channel')
  async joinChannel(
    @ConnectedSocket() socket: Socket,
    @MessageBody() joinChannelDto: JoinChannelDTO
  ) {
    const author = await this.socketService.getUserFromSocket(socket);

    const response = await this.channelService.joinChannel(author, joinChannelDto);
    this.server.to(author.username).socketsJoin(response.channelName);
    this.server.to(response.channelName).emit('receive_join_channel', response);
  }

  @SubscribeMessage('invite_channel')
  async inviteChannel(
    @ConnectedSocket() socket: Socket,
    @MessageBody() inviteUser: InviteUserDTO
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    const target = await this.channelService.inviteUserInChannel(author, inviteUser);

    // Notify target of invite
    this.server.to(target.username).emit('receive_invite_channel', inviteUser.channelName);
  }

  @SubscribeMessage('leave_channel')
  async leaveChannel(
    @ConnectedSocket() socket: Socket,
    @MessageBody() channel: string
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    const response = await this.channelService.leaveChannel(author, channel);
    this.server.to(channel).emit('receive_leave_channel', response);
    this.server.to(author.username).socketsLeave(channel);
  }

  @SubscribeMessage('get_all_channels_joined')
  async getAllChannels(
    @ConnectedSocket() socket
  ) {
    const author = await this.socketService.getUserFromSocket(socket);

    const channels = await this.channelService.getAllChannelsJoined(author);
    return channels.map(channel => channel.name);
  }

  @SubscribeMessage('get_all_channels_invited')
  async getAllChannelInvited(
    @ConnectedSocket() socket
  ) {
    const author = await this.socketService.getUserFromSocket(socket);

    const channels = await this.channelService.getAllChannelsInvited(author);
    return channels.map(channel => channel.name);
  }

  //Channel infos
  @SubscribeMessage('get_channel_infos')
  async getChannelInfos(
    @ConnectedSocket() socket: Socket,
    @MessageBody() channel_name: string
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    const channel = await this.channelService.getChannel(channel_name);
    if (channel.users.findIndex(channelUser => author.username == channelUser.username) == -1) {
      throw new WsUserNotInChannelException(author.username, channel_name);
    }
    return channel;
  }

  @SubscribeMessage('is_channel_moderator')
  async isModerator(
    @ConnectedSocket() socket: Socket,
    @MessageBody() channel_name: string
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    const channel = await this.channelService.getChannel(channel_name);

    return this.channelService.hasModeratorRights(author, channel);
  }
}