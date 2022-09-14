import { BadRequestException } from "@nestjs/common";

export class UserBlockHimselfException extends BadRequestException {
  constructor() {
    super('User can not block himself');
  }
}