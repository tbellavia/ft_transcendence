import { date } from "joi";
import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsUserIsMutedOnChannelException extends WsChannelException {
  constructor(username: string, channelName: string, duration: Date) {
    const seconds =  1000 * (duration.getTime() - Date.now());

    super(
      ChannelExceptionCodes.CHANNEL_SEND_FAILED,
      `${username} is muted on ${channelName} for ${seconds} seconds`
    );
  }
}