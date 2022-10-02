import { ClassSerializerInterceptor, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { UserStatus } from "src/socket/enums/userStatus.enum";
import { SocketService } from "src/socket/socket.service";
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
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(
		private socketService: SocketService,
		private matchmakingService: MatchmakingService
	) 
	{ }

	async handleConnection(socket: Socket){
		try {
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
			});
			player_2.socket.emit("matched", {
				id,
				username: player_1.user.username
			});

			match = await this.matchmakingService.match();
		}
	}
}

// TODO: if MATCH MAKING ET inviter quelqu un a jouer