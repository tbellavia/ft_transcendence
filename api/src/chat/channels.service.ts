import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WsException } from "@nestjs/websockets";
import Joi from "joi";
import { PostgresErrorCode } from "src/database/postgresErrorCode.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { JoinChannelDTO } from "./dto/joinChannel.dto";
import { ChannelEntity } from "./entities/channel.entity";
import { WsChannelNotFoundException } from "./exceptions/channel/wsChannelNotFound.exception";
import { WsUserAlreadyInChannelException } from "./exceptions/channel/wsUserAlreadyInChannel.exception";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: Repository<ChannelEntity>
  ) {}

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

    if (channel.users.findIndex(chanUser => user.username == chanUser.username) == -1)
      throw new WsUserAlreadyInChannelException(user.username, joinChannelDto.name);

    channel.users.push(user);
    await this.channelRepository.save(channel);
    return channel;
  }

  private async getChannel(name: string) {
    const channel = await this.channelRepository.findOneBy({ name });
    if (!channel)
      throw new WsChannelNotFoundException(name);
    return channel;
  }
}