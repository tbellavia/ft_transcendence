import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsUserIsMutedOnChannelException extends WsChannelException {
  constructor(username: string, channelName: string) {
    super(
      ChannelExceptionCodes.CHANNEL_SEND_FAILED,
      `${username} is muted on ${channelName}`
    );
  }
}