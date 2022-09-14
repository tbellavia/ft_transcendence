import { NotFoundException } from "@nestjs/common";

export class StatsNotFoundException extends NotFoundException {
  constructor(username: string) {
    super(`${username} for user is not found`);
  }
}