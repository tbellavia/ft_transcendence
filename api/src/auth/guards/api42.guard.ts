import { AuthGuard } from "@nestjs/passport";

export class Api42Guard extends AuthGuard('api42') {}
