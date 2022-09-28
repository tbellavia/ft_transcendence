import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { MatchEntity } from "./entity/match.entity";
import { MatchesController } from "./matches.controller";
import { MatchesService } from "./matches.service";

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([UserEntity, MatchEntity])],
    controllers: [MatchesController],
    providers: [MatchesService, UsersService]
})
export class MatchesModule {}