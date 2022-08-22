import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../../resources/users/entities/user.entity";

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return req.user as UserEntity
})
