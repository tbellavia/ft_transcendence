import { WsUnhautorizeException } from "./bases/wsUnhautorize.exception";

export class WsUserNotConnected extends WsUnhautorizeException {
  constructor() {
    super('User with socket is not connected, cookie is missing');
  }
}