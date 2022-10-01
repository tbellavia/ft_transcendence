import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { Game } from "./engine/game";
import { GameDimension } from "./engine/utils/dimension";
import { GameVec } from "./engine/utils/gameVec";
import { GameMatch } from "./interfaces/match";

interface GameWithMatch {
    game: Game;
    match: GameMatch;
}

@Injectable()
export class GameService {
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
        const game = new Game(match.player_1, match.player_2);
        
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
     * Move up the user paddle.
     * Player_1 -> Left paddle
     * Player_2 -> Right paddle
     * @param socket 
     */
    async updateMoveUp(socket: Socket) {
        const matchWithUser = this.users.get(socket);

        if ( matchWithUser ) {
            const { game, match } = matchWithUser;

            if ( this.isLeftPlayer(socket, match) ){
                game.upLeft();
            } else {
                game.upRight();
            }
            this.streamOpponentPaddleUp(socket, match);
        }
    }

    async updateMoveDown(socket: Socket) {
        const matchWithUser = this.users.get(socket);

        if ( matchWithUser ) {
            const { game, match } = matchWithUser;

            if ( this.isLeftPlayer(socket, match) ){
                game.downLeft();
            } else {
                game.downRight();
            }
            this.streamOpponentPaddleDown(socket, match);
        }
    }

    async streamOpponentPaddleUp(socket: Socket, match: GameMatch) {
        if ( this.isLeftPlayer(socket, match) ) {
            match.player_2.socket.emit("paddle-move-up");
        } else {
            match.player_1.socket.emit("paddle-move-up");
        }
    }

    async streamOpponentPaddleDown(socket: Socket, match: GameMatch) {
        if ( this.isLeftPlayer(socket, match) ) {
            match.player_2.socket.emit("paddle-move-down");
        } else {
            match.player_1.socket.emit("paddle-move-down");
        }
    }

    isLeftPlayer(socket: Socket, match: GameMatch) {
        return socket.id === match.player_1.socket.id;
    }




    // TODO: DELETE ?
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
}