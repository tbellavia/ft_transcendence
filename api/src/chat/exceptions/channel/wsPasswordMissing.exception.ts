import { WsException } from "@nestjs/websockets";

export class WsPasswordMissingException extends WsException {
  constructor(channel_name: string) {
    super(`${channel_name} require a password`);
  }
}