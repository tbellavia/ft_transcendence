import { WsException } from "@nestjs/websockets";

export class WsUserAlreadyInChannelException extends WsException {
  constructor(username: string, channel_name: string) {
    super(`${username} is already in ${channel_name}`);
  }
}