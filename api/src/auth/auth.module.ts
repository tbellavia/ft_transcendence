import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Api42Strategy } from './strategies/api42.strategy';

@Module({
  imports: [UsersModule, HttpModule, ConfigModule],
  providers: [AuthService, Api42Strategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
