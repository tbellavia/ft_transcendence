import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { JWTTwoFactorStrategy } from "./strategies/jwtTwoFactor.strategy";
import { TwoFactorAuthController } from "./twoFactorAuth.controller";
import { TwoFactorAuthService } from "./twoFactorAuth.service";

@Module({
  imports: [UsersModule, ConfigModule, AuthModule],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService, JWTTwoFactorStrategy]
}) export class TwoFactorAuthModule {};