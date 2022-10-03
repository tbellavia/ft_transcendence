import { GameDimension } from "./dimension";
import { GameVec } from "./gameVec";

export const GAME_CANVA_DIMENSION: GameDimension = new GameDimension(620, 410);
export const BALL_DIMENSION: GameDimension = new GameDimension(10, 10);
export const BALL_VELOCITY: number = 9;
export const PADDLE_VELOCITY: number = 4;
export const PADDLE_DIMENSION: GameDimension = new GameDimension(4, 45);
export const PADDLE_WALL_MARGIN: number = 20;
export const PADDLE_MARGIN: number = 15;
export const WIN_SCORE: number = 5;

export function getRatio(dimension: GameDimension) : GameVec {
    return new GameVec(
        dimension.width / GAME_CANVA_DIMENSION.width,
        dimension.height / GAME_CANVA_DIMENSION.height
    );
}

export function getCanvasRatio(canva: HTMLCanvasElement) {
    return new GameVec(
        canva.width / GAME_CANVA_DIMENSION.width,
        canva.height / GAME_CANVA_DIMENSION.height
    );
}