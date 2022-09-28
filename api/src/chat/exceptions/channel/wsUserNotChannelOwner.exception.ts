import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsUserNotChannelOwnerException extends WsChannelException {
  constructor(username: string, channelName: string) {
    super(ChannelExceptionCodes.CHANNEL_UPDATE_FAILED, `${username} has to be owner of ${channelName}`);
  }
}