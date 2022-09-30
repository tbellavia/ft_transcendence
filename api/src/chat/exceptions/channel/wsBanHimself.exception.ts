import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsBanHimselfException extends WsChannelException {
  constructor(username, channelName) {
    super(
      ChannelExceptionCodes.CHANNEL_UPDATE_FAILED,
      `${username} can not ban himself from ${channelName}`
    );
  }
}