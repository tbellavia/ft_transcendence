import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { TwoFactorAuthController } from "./twoFactorAuth.controller";
import { TwoFactorAuthService } from "./twoFactorAuth.service";

@Module({
  imports: [UsersModule, ConfigModule, AuthModule],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService]
}) export class TwoFactorAuthModule {};