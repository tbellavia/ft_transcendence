import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";
import { TwoFactorAuthController } from "./twoFactorAuth.controller";
import { TwoFactorAuthService } from "./twoFactorAuth.service";

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService]
}) export class TwoFactorAuthModule {};