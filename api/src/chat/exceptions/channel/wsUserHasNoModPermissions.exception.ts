import { WsException } from "@nestjs/websockets";

export class WsUserHasNotModPermissionsException extends WsException {
  constructor(username: string, channelName: string) {
    super(`${username} has not the required permissions in ${channelName}`);
  }
}