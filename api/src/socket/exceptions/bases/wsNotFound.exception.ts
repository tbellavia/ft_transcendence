import { WsException } from "@nestjs/websockets";
import { SocketExceptionCodes } from "../enum/socketExceptionCodes.enum";

export class WsNotFoundException extends WsException {
  constructor(message: string) {
    super({status: SocketExceptionCodes.NOT_FOUND, message});
  }
}