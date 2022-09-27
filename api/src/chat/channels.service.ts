import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WsException } from "@nestjs/websockets";
import { PostgresErrorCode } from "src/database/postgresErrorCode.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { JoinChannel } from "./classes/joinChannel.class";
import { LeaveChannel } from "./classes/leaveChannel.class";
import { JoinChannelDTO } from "./dto/joinChannel.dto";
import { ChannelEntity } from "./entities/channel.entity";
import { WsChannelNotFoundException } from "./exceptions/channel/wsChannelNotFound.exception";
import { WsUserAlreadyInChannelException } from "./exceptions/channel/wsUserAlreadyInChannel.exception";
import { WsUserNotInChannelException } from "./exceptions/channel/wsUserNotInChannel.exception";
import * as bcrypt from 'bcrypt';
import { CreateChannelDTO } from "./dto/createChannel.dto";
import { WsPasswordMissingException } from "./exceptions/channel/wsPasswordMissing.exception";
import { WsInvalidCredentials } from "./exceptions/channel/wsInvalidCredentials.exception";


@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: Repository<ChannelEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  // Create, Join and Leave channel

  async createChannel(owner: UserEntity, channelRegister: CreateChannelDTO) {
    try {
      let hashedPassword: string | null = null;
      if (channelRegister.password) {
        hashedPassword = await bcrypt.hash(channelRegister.password, 10);
      }  

      const newChannel = this.channelRepository.create({
        ...channelRegister,
        password: hashedPassword,
        owner,
        users: [owner]
      })
      await this.channelRepository.save(newChannel);
      const channel = await this.getChannel(channelRegister.name);
      return new JoinChannel(owner.username, channel.name);
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
    if (channel.password) {
      if (!joinChannelDto.password)
        throw new WsPasswordMissingException(channel.name);
      const isValidPassword: boolean = await bcrypt.compare(joinChannelDto.password, channel.password);
      if (!isValidPassword)
        throw new WsInvalidCredentials(channel.name);
    }

    channel.users.push(user);
    await this.channelRepository.save(channel);
    return new JoinChannel(user.username, channel.name);
  }

  async leaveChannel(user: UserEntity, channel_name: string) {
    let channel = await this.getChannel(channel_name);
    
    if (channel.owner.username == user.username) {
      //If user is creator transfer ownership if not the last user
      if (channel.users.length != 1)
        this.transferOwnership(channel);
      //Or if last user destroy the channel
      else {
        await this.destroyChannel(channel);
        return new LeaveChannel(user.username, channel_name);
      }
    }

    await this.channelRepository.save(channel);
    return new LeaveChannel(user.username, channel_name);
  }

  private async destroyChannel(channel: ChannelEntity) {
    await this.channelRepository.remove(channel);
  }

  // Channel Moderators and ownership

  private async transferOwnership(channel: ChannelEntity) {
    channel.owner = channel.moderators[0] || channel.users[0];
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
      .leftJoinAndSelect('channel.owner', 'owner')
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