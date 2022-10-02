import { ClassSerializerInterceptor, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { SocketService } from "src/socket/socket.service";
import { GameService } from "./game.service";
import { MatchAskingService } from "./matchAsking/matchasking.service";
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
	@WebSocketServer()
	server: Server;

	constructor(
		private socketService: SocketService,
		private gameService: GameService,
		private matchmakingService: MatchmakingService,
		private matchAskingService: MatchAskingService
		) 
	{}

	async handleConnection(socket: Socket){
		try {
			await this.socketService.connectUserWithSocket(socket);
		} catch {}
	}

	async handleDisconnect(socket: Socket) {
		const user = await this.socketService.disconnectSocketBindedToUser(socket);
	}

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

	@SubscribeMessage("spectator-subscribe")
	async subscribeSpectator(
		@ConnectedSocket() socket: Socket,
		@MessageBody() matchId: string
	) 
	{
		this.gameService.subscribeSpectator(matchId, socket);
	}

	@SubscribeMessage("spectator-unsubscribe")
	async unsubscribeSpectator(@ConnectedSocket() socket: Socket) {
		this.gameService.unsubscribeSpectator(socket);
	}

	@SubscribeMessage("paddle-move-up")
	async paddleMoveUp(@ConnectedSocket() socket: Socket) 
	{
		this.gameService.updateMoveUp(socket);
	}

	@SubscribeMessage("paddle-move-down")
	async paddleMoveDown(@ConnectedSocket() socket: Socket) {
		this.gameService.updateMoveDown(socket);
	}

	@SubscribeMessage("suggest-match") 
	async suggestMatch(
		@ConnectedSocket() socket: Socket,
		@MessageBody() opponent: string) {
		const user = await this.socketService.getUserFromSocket(socket);
		if (user.username == opponent) {
			throw new WsException('User can not suggest match to himself');
		}
		
		// Check if opponent is connected
		const opponentUser = await this.socketService.getUserByName(opponent);
		const opponentSocket = this.socketService.getSocketsFromUsername(opponent);
		if (!opponentSocket)
			throw new WsException(`${opponentUser.username} is not connected!`);
			
		// Ignore if in game-match
		if (this.gameService.getGameOfUser(user))
			throw new WsException(`User is already in a game!`);
			
		// Unsubscribe from matchmaking
		if (this.matchmakingService.isSubscribed(user))
			this.matchmakingService.unSubscribe(user, socket);

		// Send notification to targeted user (opponent)
		await this.matchAskingService.subscribe(user, socket, opponentUser);
		this.server.to(opponent).emit('asking-match', user.username);
	}
	
	@SubscribeMessage("accept-match") 
	async acceptMatch(
		@ConnectedSocket() socket: Socket,
		@MessageBody() opponent: string) {
		const user = await this.socketService.getUserFromSocket(socket);
		if (user.username == opponent)
			throw new WsException('User can not accept match with himself');

		// Check if opponent is connected
		const opponentUser = await this.socketService.getUserByName(opponent);
		const opponentSocket = this.socketService.getSocketsFromUsername(opponent);
		if (!opponentSocket)
			throw new WsException(`${opponentUser.username} is not connected!`);
			
		// Ignore if in game-match
		if (this.gameService.getGameOfUser(user))
			throw new WsException(`User is already in a game!`);
			
		// Unsubscribe from matchmaking
		if (this.matchmakingService.isSubscribed(user))
			this.matchmakingService.unSubscribe(user, socket);

		// Create the match!
		const match = await this.matchAskingService.acceptOrRefuse(opponentUser, user, socket);
		const {player_1, player_2, id} = match;
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
		await this.gameService.initGame(match);
	}

	@SubscribeMessage("refuse-match")
	async refuseMatch(
		@ConnectedSocket() socket: Socket,
		@MessageBody() opponent: string) {
		const user = await this.socketService.getUserFromSocket(socket);
		if (user.username == opponent)
			throw new WsException('User can not deny match with himself');

		// Check if opponent is connected
		const opponentUser = await this.socketService.getUserByName(opponent);
		const opponentSocket = this.socketService.getSocketsFromUsername(opponent);
		if (!opponentSocket)
			throw new WsException(`${opponentUser.username} is not connected!`);
			
			// Ignore if in game-match
		if (this.gameService.getGameOfUser(user))
			throw new WsException(`User is already in a game!`);

		// Unsubscribe from matchmaking
		if (this.matchmakingService.isSubscribed(user))
			this.matchmakingService.unSubscribe(user, socket);

		// Create the match!
		await this.matchAskingService.acceptOrRefuse(opponentUser, user, socket, false);
	}
}

// TODO: if MATCH MAKING ET inviter quelqu un a jouer