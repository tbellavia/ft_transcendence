import { WsChannelException } from "./baseExceptions/wsChannel.exception";
import { ChannelExceptionCodes } from "./enums/channelExceptionsCode.enum";

export class WsChannelNotFoundException extends WsChannelException {
  constructor(channelName: string) {
    super(ChannelExceptionCodes.CHANNEL_FETCH_FAILED, `Channel ${channelName} does not exists`);
  }
}