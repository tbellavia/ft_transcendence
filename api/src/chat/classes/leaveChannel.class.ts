import { ChannelEntity } from "../entities/channel.entity";

export class LeaveChannel {
  username: string;
  channel: ChannelEntity

  constructor(username: string, channel: ChannelEntity) {
    this.username = username;
    this.channel = channel;
  }
}