import { NotFoundException } from "@nestjs/common";

export class BlockRelationNotFoundException extends NotFoundException {
  constructor() {
    super('Blocked relation not found');
  }
}