import { UnauthorizedException } from "@nestjs/common";

export class WsBlockedByUserException extends UnauthorizedException {
  constructor(username1: string, username2: string) {
    super(`${username1} is blocked and can not send messages to ${username2}.`);
  }
}