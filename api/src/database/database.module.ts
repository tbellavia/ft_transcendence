import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendEntity } from "../resources/friends/entity/friend.entity";
import { MatchEntity } from "../resources/matches/entity/match.entity";
import { BlockedEntity } from "../resources/blocked/entity/blocked.entity";
import { StatEntity } from "../resources/stats/entities/stat.entity";
import { UserEntity } from "../resources/users/entities/user.entity";

@Module({
  imports: [
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
  ]
})
export class DatabaseModule {}
