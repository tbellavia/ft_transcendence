import { UserEntity } from "src/users/entities/user.entity";
import { GameUser } from "./gameUser";

export interface GameMatch {
	id: string;
	player_1: GameUser;
	player_2: GameUser;
}