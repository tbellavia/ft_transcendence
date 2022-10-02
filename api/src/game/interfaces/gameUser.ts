import { Socket } from "socket.io";
import { UserEntity } from "src/users/entities/user.entity";

export class GameUser {
	user: UserEntity;
	socket: Socket;

	constructor(user: UserEntity, socket: Socket) {
		this.user = user;
		this.socket = socket;
	}
}