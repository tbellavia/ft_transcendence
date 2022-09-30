import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsUserNotInChannelException extends WsChannelException {
  constructor(username: string, channelName: string) {
    super(ChannelExceptionCodes.CHANNEL_UPDATE_FAILED, `${username} is not in ${channelName}`);
  }
}