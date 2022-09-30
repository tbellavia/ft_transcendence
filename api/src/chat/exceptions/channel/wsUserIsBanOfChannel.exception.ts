import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsUserIsBannedOfChannel extends WsChannelException {
  constructor(username: string, channelName: string) {
    super(
      ChannelExceptionCodes.CHANNEL_JOIN_FAILED,
      `${username} is banned of ${channelName} and can not join it`
    );
  }
}