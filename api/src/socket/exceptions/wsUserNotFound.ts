import { WsNotFoundException } from "./bases/wsNotFound.exception";

export class WsUserNotFoundException extends WsNotFoundException {
  constructor(user_id: string) {
    super(`User ${user_id} not found`);
  }
}