import { WsException } from "@nestjs/websockets";
import { SocketExceptionCodes } from "../enum/socketExceptionCodes.enum";

export class WsUnhautorizeException extends WsException {
  constructor(message: string) {
    super({status: SocketExceptionCodes.UNHAUTHORIZE, message});
  }
}