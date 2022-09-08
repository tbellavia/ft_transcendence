import { AuthGuard } from "@nestjs/passport";

export class PasswordAuthGuard extends AuthGuard('password') {}