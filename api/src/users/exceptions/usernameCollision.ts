import { ConflictException } from "@nestjs/common";

export class UsernameCollision extends ConflictException {
    constructor(username: string) {
        super(`${username} already exists.`);
    }
}