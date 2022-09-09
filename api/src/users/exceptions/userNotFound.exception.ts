import { NotFoundException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  constructor(user_id: string) {
    super(`User ${user_id} not found.`);
  }
}