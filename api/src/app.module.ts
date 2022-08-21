import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JWTAuthGuard } from './auth/guards/jwtauth.guard';
import { DataSource } from 'typeorm';
import { UserEntity } from './users/entities/user.entity';
import { StatEntity } from './stats/entities/stat.entity';
import { BlockedEntity } from './blocked/entity/blocked.entity';
import { FriendEntity } from './friends/entity/friend.entity';
import { MatchEntity } from './matches/entity/match.entity';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    AuthModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity, 
        StatEntity, 
        BlockedEntity,
        FriendEntity,
        MatchEntity
      ],
      // TODO: Remove for production
      synchronize: true
    }),
    UsersModule
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
