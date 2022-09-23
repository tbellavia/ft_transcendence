import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WsException } from "@nestjs/websockets";
import e from "express";
import { PostgresErrorCode } from "src/database/postgresErrorCode.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { LeaveChannel } from "./classes/leaveChannel.class";
import { JoinChannelDTO } from "./dto/joinChannel.dto";
import { ChannelEntity } from "./entities/channel.entity";
import { WsChannelNotFoundException } from "./exceptions/channel/wsChannelNotFound.exception";
import { WsUserAlreadyInChannelException } from "./exceptions/channel/wsUserAlreadyInChannel.exception";
import { WsUserNotInChannelException } from "./exceptions/channel/wsUserNotInChannel.exception";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: Repository<ChannelEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  // Create, Join and Leave channel

  async createChannel(creator: UserEntity, channelRegister: JoinChannelDTO) {
    try {
      const newChannel = this.channelRepository.create({
        ...channelRegister,
        creator,
        users: [creator]
      })
      await this.channelRepository.save(newChannel);
      return await this.getChannel(channelRegister.name);
    }
    catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        throw new WsException(`channel ${channelRegister.name} already exists`);
      throw error;
    }
  }

  async joinChannel(user: UserEntity, joinChannelDto: JoinChannelDTO) {
    const channel = await this.getChannel(joinChannelDto.name);

    if (channel.users.findIndex(chanUser => user.username == chanUser.username) != -1)
      throw new WsUserAlreadyInChannelException(user.username, joinChannelDto.name);

    channel.users.push(user);
    await this.channelRepository.save(channel);
    return channel;
  }

  async leaveChannel(user: UserEntity, channel_name: string) {
    let channel = await this.getChannel(channel_name);
    
    if (channel.creator.username == user.username) {
      //If user is creator transfer ownership if not the last user
      if (channel.users.length != 1)
        this.transferOwnership(user, channel);
      //Or if last user destroy the channel
      else {
        await this.destroyChannel(channel);
        return new LeaveChannel(user.username, channel);
      }
    }

    // Remove user from the list of users
    if (channel.users.findIndex(channelUser => channelUser.username == user.username) == -1)
      throw new WsUserNotInChannelException(user.username, channel_name);
      
    channel.users = channel.users.filter(channelUser => channelUser.username != user.username);
    await this.channelRepository.save(channel);

    return new LeaveChannel(user.username, channel);
  }

  private async destroyChannel(channel: ChannelEntity) {
    await this.channelRepository.remove(channel);
    
  }

  // Channel Moderators and ownership

  private async transferOwnership(previousOwner: UserEntity, channel: ChannelEntity) {
    channel.creator = channel.moderators[0] || channel.users[0];
    await this.channelRepository.save(channel);
  }

  // Getters

  async getAllChannels(user: UserEntity) {
    const channels = await this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect(
        'channel.users', 
        'users',
      )
      .where('users.user_id = :user_id', { user_id: user.user_id })
      .leftJoinAndSelect('channel.moderators', 'moderators')
      .leftJoinAndSelect('channel.creator', 'creator')
      .getMany();
    return channels;
  }

  async getChannel(name: string) {
    const channel = await this.channelRepository.findOneBy({ name });
    if (!channel)
      throw new WsChannelNotFoundException(name);
    return channel;
  }
}