import { WsException } from "@nestjs/websockets";
import { SocketExceptionCodes } from "../enum/socketExceptionCodes.enum";

export class WsInternalError extends WsException {
  constructor() {
    super({status: SocketExceptionCodes.INTERNAL_ERROR, messsage: 'Internal server error'});
  }
}