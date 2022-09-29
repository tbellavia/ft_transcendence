import { GameDimension } from "./dimension";

function toRadians(degree: number) : number {
	return degree * (Math.PI / 180);
}

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

	equal(other: GameVec) : boolean {
		return this.x === other.x && this.y === other.y;
	}

	rotate(angle: number) {
		const radians = toRadians(angle);
		const x = this.x;

		this.x = x * Math.cos(radians) - this.y * Math.sin(radians);
		this.y = x * Math.sin(radians) + this.y * Math.cos(radians);
		return this;
	}

	reverse() {
		this.rotate(180);
		return this;
	}

	normalize() {
		const mag = this.magnitude();

		this.x = this.x / mag;
		this.y = this.y / mag;
		return this;
	}

	magnitude() : number {
		return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
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