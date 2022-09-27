import { WsException } from "@nestjs/websockets";
import { ChannelExceptionCodes } from "../enums/channelExceptionsCode.enum";

export class WsChannelException extends WsException {
  constructor(status: ChannelExceptionCodes, message: string) {
    super({status, message});
  }
}