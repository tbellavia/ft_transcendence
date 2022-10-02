import { ClassSerializerInterceptor, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
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
import { UpdateChannelDto } from "./dto/updateChannel.dto";
import { ChannelUserTargetDTO } from "./dto/channelUserTarget.dto";
import { MuteUserOnChannelDTO } from "./dto/muteUserOnChannel.dto";
import { UserStatus } from "src/socket/enums/userStatus.enum";
import { BlockedService } from "src/blocked/blocked.service";
import { ReceiveMessage } from "./classes/receiveMessage.class";


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
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  constructor(
    private readonly socketService: SocketService,
    private readonly chatService: ChatService,
    private readonly channelService: ChannelsService,
    private readonly blockedService: BlockedService
  ) {}

  //Be aware filters does not works on handleConnection !
  async handleConnection(socket: Socket) {
    try {
    } catch {}
  }

  async handleDisconnect(socket: Socket) {
    const user = await this.socketService.disconnectSocketBindedToUser(socket);
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

    const sockets = await this.server.in(message.target).fetchSockets();
    sockets.forEach(async socketTarget => {
      const target = await this.socketService.getUserFromSocket(socketTarget);
      if (await this.blockedService.exists(target.username, author.username)) {
        socketTarget.emit('receive_message', new ReceiveMessage(`is blocked and you can not see its messages`, author.username));
      } else {
        socketTarget.emit('receive_message', receiveMessage);
      }
    });
    await this.socketService.setUserStatus(socket, UserStatus.CHATTING);
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
    return response.channelName;
  }

  @SubscribeMessage('invite_user_in_channel')
  async inviteUserInChannel(
    @ConnectedSocket() socket: Socket,
    @MessageBody() inviteUser: InviteUserDTO
  ) {
    const author = await this.socketService.getUserFromSocket(socket);
    const target = await this.channelService.inviteUserInChannel(author, inviteUser);

    // Notify target of invite
    if (target)
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
    @ConnectedSocket() socket: Socket
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
  async isChannelModerator(
    @ConnectedSocket() socket: Socket,
    @MessageBody() isModerator: ChannelUserTargetDTO
  ) {
    await this.socketService.getUserFromSocket(socket);
    const channel = await this.channelService.getChannel(isModerator.name);
    const user = await this.socketService.getUserByName(isModerator.username);

    return this.channelService.hasModeratorRights(user, channel);
  }

  @SubscribeMessage('is_channel_owner')
  async isChannelOwner(
    @ConnectedSocket() socket: Socket,
    @MessageBody() isModerator: ChannelUserTargetDTO
  ) {
    await this.socketService.getUserFromSocket(socket);
    const channel = await this.channelService.getChannel(isModerator.name);
    const user = await this.socketService.getUserByName(isModerator.username);

    return channel.owner.username == user.username;
  }

  //Channel Parameters
  @SubscribeMessage('update_channel')
  async updateChannel(
    @ConnectedSocket() socket: Socket,
    @MessageBody() updateParams: UpdateChannelDto
  ) {
    const user = await this.socketService.getUserFromSocket(socket);
    await this.channelService.updateChannel(user, updateParams);
  }

  @SubscribeMessage('add_channel_moderator')
  async addChannelModerator(
    @ConnectedSocket() socket: Socket,
    @MessageBody() addModerator: ChannelUserTargetDTO
  ) {
    const user = await this.socketService.getUserFromSocket(socket);
    await this.channelService.addChannelModerator(user, addModerator);

    this.server.to(addModerator.name)
      .emit(
        'receive_add_channel_moderator',
        {
          channelName: addModerator.name,
          username: addModerator.username
        }
      );
  }

  @SubscribeMessage('remove_channel_moderator')
  async removeChannelModerator(
    @ConnectedSocket() socket: Socket,
    @MessageBody() removeModerator: ChannelUserTargetDTO
  ) {
    const user = await this.socketService.getUserFromSocket(socket);
    await this.channelService.removeChannelModerator(user, removeModerator);

    this.server.to(removeModerator.name)
      .emit(
        'receive_remove_channel_moderator',
        {
          channelName: removeModerator.name,
          username: removeModerator.username
        }
      );
  }

  @SubscribeMessage('ban_channel_user')
  async banChannelUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() banUser: ChannelUserTargetDTO
  ) {
    const user = await this.socketService.getUserFromSocket(socket);
    await this.channelService.banChannelUser(user, banUser);

    this.server.to(banUser.name)
    .emit(
      'receive_ban_channel_user',
      {
        channelName: banUser.name,
        username: banUser.username
      }
    );

    this.server.to(banUser.username).socketsLeave(banUser.name);
  }

  @SubscribeMessage('unban_channel_user')
  async unbanChannelUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() unbanUser: ChannelUserTargetDTO
  ) {
    const user = await this.socketService.getUserFromSocket(socket);
    await this.channelService.unbanChannelUser(user, unbanUser);

    this.server.to(unbanUser.name)
      .emit(
        'receive_unban_channel_user',
        {
          channelName: unbanUser.name,
          username: unbanUser.username
        }
      );
  }

  @SubscribeMessage('mute_channel_user')
  async muteChannelUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() muteUser: MuteUserOnChannelDTO
  ) {
    const user = await this.socketService.getUserFromSocket(socket);
    await this.channelService.muteChannelUser(user, muteUser);


    // Send back unmute notif when time has passed
    setTimeout(async () => 
    {
      await this.channelService.unmuteChannelUser(user, {...muteUser});

      this.server.emit(
        'receive_unmute_channel_user',
        {
          channelName: muteUser.name,
          username: muteUser.username
        }
      );
    },
      muteUser.durationMs
    );


    this.server.to(muteUser.name)
      .emit(
        'receive_mute_channel_user',
        {
          channelName: muteUser.name,
          username: muteUser.username
        }
      );
  }

  @SubscribeMessage('is_muted_user')
  async isMutedUserOnChannel(
    @ConnectedSocket() socket: Socket,
    @MessageBody() isMutedUser: ChannelUserTargetDTO
  ) {
    const user = await this.socketService.getUserFromSocket(socket);
    return await this.channelService.isMutedChannelUser(user, isMutedUser);
  }
}