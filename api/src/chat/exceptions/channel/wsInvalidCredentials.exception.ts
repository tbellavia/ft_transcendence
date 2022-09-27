import { WsException } from "@nestjs/websockets";

export class WsInvalidCredentials extends WsException {
  constructor(channel_name: string) {
    super(`${channel_name} invalid credentials`);
  }
}