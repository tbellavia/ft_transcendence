import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsInvalidCredentials extends WsChannelException {
  constructor(channelName: string) {
    super(ChannelExceptionCodes.CHANNEL_JOIN_FAILED, `${channelName} invalid credentials`);
  }
}