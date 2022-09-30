import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsPasswordMissingException extends WsChannelException {
  constructor(channelName: string) {
    super(ChannelExceptionCodes.CHANNEL_JOIN_FAILED, `${channelName} require a password`);
  }
}