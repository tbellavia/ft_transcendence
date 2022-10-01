import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { Game } from "./engine/game";
import { GameDimension } from "./engine/utils/dimension";
import { GameMatch } from "./interfaces/match";

interface GameWithMatch {
    game: Game;
    match: GameMatch;
}

@Injectable()
export class GameService {
    static  GAME_CANVA: GameDimension = new GameDimension(620, 410);
    private users: Map<Socket, GameWithMatch>;
    private games: Game[];

	constructor() 
    {
        // Init game loop here ?
        this.users = new Map<Socket, GameWithMatch>();
        this.games = [];
        this.gameLoop();
    }

    async initGame(match: GameMatch) {
        const game = new Game(GameService.GAME_CANVA, match.player_1, match.player_2);
        
        setTimeout(() => {
            console.log("Game started!");
            game.start();
        }, 5000);
        this.games.push(game);
        this.users.set(match.player_1.socket, { game, match });
        this.users.set(match.player_2.socket, { game, match });
    }

    async gameLoop() {
        this.update();

        setTimeout(() => {
            this.gameLoop();
        }, 35);
    }

    /**
     * Update all games.
     */
    async update() {
        this.games.forEach((game) => {
            game.update();
        })
    }

    /**
     * Update the position of user associated with the socket.
     * Player_1 -> Left paddle
     * Player_2 -> Right paddle
     * 
     * @param socket
     * @param y 
     */
    async updateGamePaddlePos(socket: Socket, y: number) {
        const matchWithUser = this.users.get(socket);

        if ( matchWithUser ) {
            const { game, match } = matchWithUser;

            if ( this.isLeftPlayer(socket, match) ){
                game.setLeftPaddlePos(y);
            } else {
                game.setRightPaddlePos(y);
            }
            this.streamOpponentPaddlePos(socket, match, y);
        }
    }

    async streamOpponentPaddlePos(current: Socket, match: GameMatch, y: number) {
        if ( current.id === match.player_1.socket.id ) {
            match.player_2.socket.emit("paddle-pos", y);
        } else {
            match.player_1.socket.emit("paddle-pos", y);
        }
    }

    isLeftPlayer(socket: Socket, match: GameMatch) {
        return socket.id === match.player_1.socket.id;
    }
}