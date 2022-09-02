import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JWTAuthGuard } from './auth/guards/jwtauth.guard';
import { DataSource } from 'typeorm';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { StatsModule } from './stats/stats.module';
import { FriendsModule } from './friends/friends.module';
import { BlockedModule } from './blocked/blocked.module';
import { MatchesModule } from './matches/matches.module';
import TwoFactorAuthModule from './twoFactorAuth/twoFactorAuth.module';
import DataBaseModule from './database/database.module';
import ConfigurationModule from './configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule,
    DataBaseModule,
    AuthModule,
    UsersModule,
    StatsModule,
    FriendsModule,
    BlockedModule,
    MatchesModule,
    TwoFactorAuthModule
  ],
  controllers: [AppController, UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
