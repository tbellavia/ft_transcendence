import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchEntity } from "src/matches/entity/match.entity";
import { MatchesModule } from "src/matches/matches.module";
import { MatchesService } from "src/matches/matches.service";
import { SocketModule } from "src/socket/socket.module";
import { StatEntity } from "src/stats/entities/stat.entity";
import { StatsModule } from "src/stats/stats.module";
import { StatsService } from "src/stats/stats.service";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { GameGateway } from "./game.gateway";
import { GameService } from "./game.service";
import { MatchAskingService } from "./matchAsking/matchasking.service";
import { MatchmakingService } from "./matchmaking/matchmaking.service";

@Module({
	imports: [SocketModule, MatchesModule, StatsModule, TypeOrmModule.forFeature([UserEntity, MatchEntity, StatEntity])],
	providers: [GameGateway, GameService, MatchesService, MatchmakingService, MatchAskingService, UsersService, StatsService]
})
export class GameModule { }