import { WsException } from "@nestjs/websockets";

export class WsInternalError extends WsException {
  constructor() {
    super('Internal server error');
  }
}