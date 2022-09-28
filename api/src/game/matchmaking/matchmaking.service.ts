import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Socket } from "socket.io";
import { MatchEntity } from "src/matches/entity/match.entity";
import { MatchesService } from "src/matches/matches.service";
import { UserEntity } from "src/users/entities/user.entity";
import { GameUser } from "../interfaces/gameUser";
import { GameMatch } from "../interfaces/match";

@Injectable()
export class MatchmakingService {
	private pool: GameUser[];

	constructor(
		private matchesService: MatchesService
	) 
	{
		this.pool = [];
	}

	// TODO: Verify if user is already subscribed
	async subscribe(user: UserEntity, socket: Socket) {
		if ( !this.isSubscribed(user) )
			this.pool.push({ user, socket });
	}

	async match() : Promise<GameMatch> {
		if ( this.pool.length > 1 ) {
			// const match = 
			const player_1 = this.pool.shift();
			const player_2 = this.pool.shift();
			const match = await this.matchesService.create(
				player_1.user.username,
				player_2.user.username
			);
			return {
				id: match.match_id,
				player_1,
				player_2
			};
		}
		return null;
	}

	isSubscribed(needle: UserEntity) {
		return this.pool.filter(({ user }) => user.username === needle.username).length >= 1;
	}
}