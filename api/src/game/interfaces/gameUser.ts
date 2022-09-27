import { Socket } from "socket.io";
import { UserEntity } from "src/users/entities/user.entity";

export interface GameUser {
	user: UserEntity;
	socket: Socket;
}