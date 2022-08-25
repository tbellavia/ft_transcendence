import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { MatchEntity } from "./entity/match.entity";
import { MatchesController } from "./matches.controller";
import { MatchesService } from "./matches.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, MatchEntity])],
    controllers: [MatchesController],
    providers: [MatchesService]
})
export class MatchesModule {}