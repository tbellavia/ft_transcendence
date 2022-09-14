import { BadRequestException } from "@nestjs/common";

export class UserAlreadyBlockedException extends BadRequestException {
  constructor(username: string) {
    super(`${username} is already blocked`);
  }
}