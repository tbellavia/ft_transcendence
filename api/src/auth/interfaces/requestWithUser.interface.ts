import { Request } from "@nestjs/common";
import { UserEntity } from "src/users/entities/user.entity";

export interface RequestWithUser extends Request {
  user: UserEntity
}