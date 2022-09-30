import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsUserIsMutedOnChannelException extends WsChannelException {
  constructor(username: string, channelName: string, duration: Date) {
    const seconds =  Math.round((duration.getTime() - Date.now()) / 1000);

    super(
      ChannelExceptionCodes.CHANNEL_SEND_FAILED,
      `${username} is muted on ${channelName} for ${seconds} seconds`
    );
  }
}