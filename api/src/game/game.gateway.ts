import { ClassSerializerInterceptor, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { userInfo } from "os";
import { Socket } from "socket.io";
import { MatchesService } from "src/matches/matches.service";
import { SocketService } from "src/socket/socket.service";
import { GameService } from "./game.service";
import { MatchmakingService } from "./matchmaking/matchmaking.service";

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
	strategy: 'excludeAll',
	exposeUnsetFields: false,
	excludeExtraneousValues: true
})
@WebSocketGateway({
	namespace: "game",
	cors: {
		origin: true,
		credentials: true
	}
})
export class GameGateway {
	constructor(
		private socketService: SocketService,
		private gameService: GameService,
		private matchmakingService: MatchmakingService
	) 
	{ }

	@SubscribeMessage("subscribe")
	async subscribeMatchmaking(@ConnectedSocket() socket: Socket) 
	{
		const user = await this.socketService.getUserFromSocket(socket);
		console.log(`${user.username} subscribed to matchmaking!`);

		this.matchmakingService.subscribe(user, socket);
		let match = await this.matchmakingService.match();
		while ( match ){
			const { id, player_1, player_2 } = match;
			
			player_1.socket.emit("matched", {
				id,
				username: player_2.user.username,
				left: true 
			});
			player_2.socket.emit("matched", {
				id,
				username: player_1.user.username,
				left: false
			});
			this.gameService.initGame(match);
			match = await this.matchmakingService.match();
		}
	}

	@SubscribeMessage("update-paddle-pos")
	async updatePaddlePos(
		@ConnectedSocket() socket: Socket,
		@MessageBody() y: number
	) 
	{
		// console.log(`Position ${y}`);
		this.gameService.updateGamePaddlePos(socket, y);
	}

	@SubscribeMessage("paddle-move-up")
	async paddleMoveUp(@ConnectedSocket() socket: Socket) 
	{
		console.log("MOVE UP");
		this.gameService.updateMoveUp(socket);
	}

	@SubscribeMessage("paddle-move-down")
	async paddleMoveDown(@ConnectedSocket() socket: Socket) {
		console.log("MOVE DOWN");
		this.gameService.updateMoveDown(socket);
	}
}

// TODO: if MATCH MAKING ET inviter quelqu un a jouer