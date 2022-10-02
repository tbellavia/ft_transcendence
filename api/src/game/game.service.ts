import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { UserEntity } from "src/users/entities/user.entity";
import { MatchesService } from "src/matches/matches.service";
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
    private games: Set<Game>;
    private matches: Map<Game, GameWithMatch>;

	constructor(
        private matchesService: MatchesService
    ) 
    {
        // Init game loop here ?
        this.users = new Map<Socket, GameWithMatch>();
        this.games = new Set<Game>();
        this.matches = new Map<Game, GameWithMatch>();
        this.gameLoop();
    }

    async initGame(match: GameMatch) {
        const game = new Game(match.player_1, match.player_2);
        let seconds = 0;
        
        const timer = setInterval(() => {
            this.emitGameTimer(match, 5 - seconds);
            console.log("MATCH " + seconds);
            if ( seconds == 5 ){
                game.start();
                clearInterval(timer);
            }
            seconds++;
        }, 1000);

        this.games.add(game);
        this.matches.set(game, { game, match });
        this.users.set(match.player_1.socket, { game, match });
        this.users.set(match.player_2.socket, { game, match });
    }

    async gameLoop() {
        this.update();

        setTimeout(() => {
            this.gameLoop();
        }, 35);
    }

    async emitGameTimer(match: GameMatch, second: number) {
        match.player_1.socket.emit("game-start-timer", second);
        match.player_2.socket.emit("game-start-timer", second);
    }

    /**
     * Update all games.
     */
    async update() {
        this.games.forEach((game) => {
            if ( !game.isAlive() ){
                // Game has ended
                this.endGame(game);
            } else {
                game.update();
            }
        })
    }

    async endGame(game: Game) {
        // Store result in DB
        // Delete match from map
        // Send event to clients
        const match = this.matches.get(game);
        const gameStats = game.getGameStats();

        // Store date
        this.matchesService.update(match.match.id, gameStats);
        this.removeGame(game);
    }

    async removeGame(game: Game) {
        this.games.delete(game);
        this.users.delete(game.player_1.socket);
        this.users.delete(game.player_2.socket);
        this.matches.delete(game);
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

    // Getter for game activity
    getGameOfUser(player: UserEntity) {
        return this.games.findIndex(game => {
            return game.player_1.user.username == player.username ||
                    game.player_2.user.username == player.username;
        });
    }
}