import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsMuteHimselfException extends WsChannelException {
  constructor(username: string, channelName: string) {
    super(
      ChannelExceptionCodes.CHANNEL_UPDATE_FAILED,
      `${username} can not mute himself on ${channelName}`
    );
  }
}