import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchEntity } from "src/matches/entity/match.entity";
import { MatchesModule } from "src/matches/matches.module";
import { MatchesService } from "src/matches/matches.service";
import { SocketModule } from "src/socket/socket.module";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { GameGateway } from "./game.gateway";
import { GameService } from "./game.service";
import { MatchmakingService } from "./matchmaking/matchmaking.service";

@Module({
	imports: [SocketModule, MatchesModule, TypeOrmModule.forFeature([UserEntity, MatchEntity])],
	providers: [GameGateway, GameService, MatchesService, MatchmakingService, UsersService]
})
export class GameModule { }