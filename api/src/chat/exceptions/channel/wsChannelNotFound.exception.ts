import { WsException } from "@nestjs/websockets";

export class WsChannelNotFoundException extends WsException {
  constructor(name: string) {
    super(`Channel ${name} does not exists`);
  }
}