import { Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { MatchesService } from "src/matches/matches.service";
import { UserEntity } from "src/users/entities/user.entity";
import { GameUser } from "../interfaces/gameUser";
import { GameMatch } from "../interfaces/match";

@Injectable()
export class MatchAskingService {
	private privateRooms = new Map<GameUser, UserEntity[]>();

	constructor(
		private matchesService: MatchesService
	) {}

	async subscribe(user: UserEntity, socket: Socket, target: UserEntity) {
		const gameUser = new GameUser(user, socket);
		
		const demands = this.privateRooms.get(gameUser);
		let newDemands = [];
		if (demands) {
			if (demands.find(opponent => opponent.username == target.username))
			throw new WsException(`${user.username} has already propposed to ${target.username}`);
			newDemands = demands.concat(newDemands);
		}
		newDemands.push(target);
		this.privateRooms.set(gameUser, newDemands);
		console.log("SUBSCRIBE:", user.username, '->', target.username);
	}

	async acceptOrRefuse(asker: UserEntity, target: UserEntity, socketTarget: Socket, isAccept: boolean = true) {
		const player_2 = new GameUser(target, socketTarget);
		// Find first GameUser that ask for private room with target
		for (let key of this.privateRooms.keys()) {
			if (key.user.username == asker.username) {
				const demands = this.privateRooms.get(key);
				// Then return the match created
				const index = demands.findIndex(demand => demand.username == target.username);
				if (demands && index != -1) {
					if (isAccept) {
						const match = await this.createMatch(key, player_2);
						this.privateRooms.delete(key);
						return match;
					}
					demands.splice(index, 1);
					this.privateRooms.set(key, demands);
				}
			}
		}
		// No private room asked by user
		throw new WsException(`${asker.username} not asking`);
	}

	async unSubscribe(user: UserEntity, socket: Socket) {
		this.privateRooms.delete(new GameUser(user, socket));
	}

	private async createMatch(player_1: GameUser, player_2: GameUser) : Promise<GameMatch> {
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
}