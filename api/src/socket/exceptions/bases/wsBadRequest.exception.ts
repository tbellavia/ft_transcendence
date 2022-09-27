import { WsException } from "@nestjs/websockets";
import { SocketExceptionCodes } from "../enum/socketExceptionCodes.enum";

export class WsBadRequestException extends WsException {
  constructor(message: string) {
    super({status: SocketExceptionCodes.BAD_REQUEST, message});
  }
}