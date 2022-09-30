import { GameDimension } from "./dimension";

export function radians(degree: number) : number {
	return degree * (Math.PI / 180);
}

export function degrees(radian: number) : number {
	return radian * (180 / Math.PI);
}

export class GameVec {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static up() {
		return new GameVec(0, -1);
	}

	static down() {
		return new GameVec(0, 1);
	}

	static left() {
		return new GameVec(-1, 0);
	}

	static right() {
		return new GameVec(1, 0);
	}

	copy() {
		return new GameVec( this.x, this.y);
	}
}