import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ChannelEntity } from "./entities/channel.entity";
import { MuteEntity } from "./entities/mute.entity";
import { WsUserIsNotMuteOnChannelException } from "./exceptions/channel/wsUserIsNotMuteOnChannel.excpetion";

@Injectable()
export class MuteService {
  constructor(
    @InjectRepository(MuteEntity)
    private muteRepository: Repository<MuteEntity>
  ) {}
  
  async muteUserOnChannel(user: UserEntity, channel: ChannelEntity, duration: Date) {
    let until_date = new Date(new Date(duration).getMilliseconds() + Date.now());

    const mute = this.muteRepository.create({
      user,
      channel,
      until_date
    });

    await this.muteRepository.save(mute);
  }

  async getUserMuteOnChannel(user: UserEntity, channel: ChannelEntity) {
    const mute = await this.muteRepository.findOneBy({
      user: {
        username: user.username
      },
      channel: {
        name: channel.name
      }
    });

    if (!mute)
      throw new WsUserIsNotMuteOnChannelException(user.username, channel.name);
    return mute;
  }

  async isUserMutedOnChannel(user: UserEntity, channel: ChannelEntity) {
    try {
      await this.getUserMuteOnChannel(user, channel);
      return true;
    } catch {
      return false;
    }
  }

  async unmuteUserOnChannel(user: UserEntity, channel: ChannelEntity) {
    const mute = await this.getUserMuteOnChannel(user, channel);
    await this.muteRepository.remove(mute);
  }
}