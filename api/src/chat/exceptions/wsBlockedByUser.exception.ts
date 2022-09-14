import { WsException } from "@nestjs/websockets";

export class WsBlockedByUserException extends WsException {
  constructor(username1: string, username2: string) {
    super(`${username1} is blocked and can not send messages to ${username2}.`);
  }
}