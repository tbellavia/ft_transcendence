import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { TwoFactorAuthController } from "./twoFactorAuth.controller";
import { TwoFactorAuthService } from "./twoFactorAuth.service";

@Module({
  imports: [UsersService, ConfigService],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService]
}) export class TwoFactorAuthModule {};