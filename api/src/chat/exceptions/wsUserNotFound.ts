import { WsException } from "@nestjs/websockets";

export class WsUserNotFoundException extends WsException {
  constructor(user_id: string) {
    super(`User ${user_id} not found`);
  }
}