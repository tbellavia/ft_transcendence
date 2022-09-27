import { WsException } from "@nestjs/websockets";

export class WsUserUnauthorizeException extends WsException {
  constructor(username: string, channel_name: string) {
    super(`${username} is not authorise to join ${channel_name}`);
  }
}