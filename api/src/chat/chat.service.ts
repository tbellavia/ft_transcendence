import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlockedService } from "src/blocked/blocked.service";
import { SocketService } from "src/socket/socket.service";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ChannelsService } from "./channels.service";
import { ReceiveMessage } from "./classes/receiveMessage.class";
import { GetAllMessagesDTO } from "./dto/getAllMessages.dto";
import { SendMessageDTO } from "./dto/sendMessage.dto";
import { ChannelEntity } from "./entities/channel.entity";
import { MessageEntity } from "./entities/message.entity";
import { WsBlockedByUserException } from "./exceptions/wsBlockedByUser.exception";
import { WsInternalError } from "src/socket/exceptions/bases/wsInternalError";
import { WsUserNotInChannelException } from "./exceptions/channel/wsUserNotInChannel.exception";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    private readonly socketService: SocketService,
    private readonly blockedService: BlockedService,
    private channelService: ChannelsService
  ) {}

  // Send Messages
  async sendMessage(author: UserEntity, message: SendMessageDTO) {
    if (!message.isChannel)
      return await this.sendPrivateMessage(author, message);
    return this.sendChannelMessage(author, message);
  }

  private async sendPrivateMessage(author: UserEntity, message: SendMessageDTO) {
    const target = await this.socketService.getUserByName(message.target);
    // Check if target doesn't blocked user
    if (await this.blockedService.exists(target.username, author.username))
      throw new WsBlockedByUserException(author.username, target.username);

    try {
      await this.saveMessage({
        author,
        user_target: target,
        content: message.message
      });
    } catch (error) {
      throw new WsInternalError();
    }

    return new ReceiveMessage(message.message, author.username);
  }

  private async sendChannelMessage(author: UserEntity, message: SendMessageDTO) {
    const channel = await this.channelService.getChannel(message.target);

    // Check if user is in channel and allowed to speak
    if (channel.users.findIndex(user => user.username == author.username) == -1)
      throw new WsUserNotInChannelException(author.username, channel.name);
    
      try {
        await this.saveMessage({
          author,
          channel_target: channel,
          content: message.message
        });
      } catch (error) {
        throw new WsInternalError();
      }

      return new ReceiveMessage(message.message, author.username);
  }

  private async saveMessage(message: MessageEntity) {
    const newMessage = this.messageRepository.create(message);
    await this.messageRepository.save(newMessage);
  }

  // Get Messages
  async getAllMessages(author: UserEntity, targets: GetAllMessagesDTO) {
    if (!targets.isChannel) {
      const targetedUser = await this.socketService.getUserByName(targets.target);
      try {
        return await this.getAllDirectMessages(author, targetedUser);
      } catch (error) {
        throw new WsInternalError();
      }
    }
    const channel = await this.channelService.getChannel(targets.target);
    if (channel.users.findIndex(user => user.username == author.username) == -1)
      throw new WsUserNotInChannelException(author.username, channel.name);
    return await this.getAllChannelMessages(author, channel);
  }

  private async getAllDirectMessages(user1: UserEntity, user2: UserEntity) {
    const messages = await this.messageRepository.find({
      where: [{
        author: {
          username: user1.username
        },
        user_target: {
          username: user2.username
        }
      },
      {
        author: {
          username: user2.username
        },
        user_target: {
          username: user1.username
        }
      }],
      order: {
        creation_date: "ASC"
      }
    })

    // If the author that requests messages has blocked the target
    if (await this.blockedService.exists(user1.username, user2.username)) {
      // We replace the message by other content
      messages
        .filter(messages => messages.author.username == user2.username)
        .forEach(message => {
          // message.author.username = 'Author blocked';
          message.content = `is blocked and you can not see its messages`;
        });
    }
    return messages;
  }

  private async getAllChannelMessages(user: UserEntity, channel: ChannelEntity) {
    const messages = channel.messages;

    for (let i = 0; i < messages.length; ++i) {
      if (await this.blockedService.exists(user.username, messages[i].author.username)) {
        messages[i].content = `is blocked and you can not see its messages`;
      }
    }
    return messages;
  }
}