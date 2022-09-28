import { WsUnhautorizeException } from "src/socket/exceptions/bases/wsUnhautorize.exception";

export class WsBlockedByUserException extends WsUnhautorizeException {
  constructor(username1: string, username2: string) {
    super(`${username1} is blocked and can not send messages to ${username2}.`);
  }
}