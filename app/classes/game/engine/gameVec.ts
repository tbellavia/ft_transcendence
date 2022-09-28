import { GameDimension } from "./dimension";

export class GameVec {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	mult(n: number) {
		this.x *= n;
		this.y *= n;
		return this;
	}

	add(other: GameVec) {
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	mult_vec(n: number) {
		return new GameVec(this.x, this.y).mult(n);
	}

	mult_add(other: GameVec) {
		return new GameVec(this.x, this.y).add(other);
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

}