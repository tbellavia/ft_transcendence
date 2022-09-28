import { GameDimension } from "./engine/dimension";
import { GameVec } from "./engine/gameVec";
import { Paddle } from "./paddle";

export class Ball {
	private canva: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private pos: GameVec;
	private dimension: GameDimension;
	private direction: GameVec;
	private velocity: number;
	private start_field: number[];
	private start_margin: number;
	private start_side: boolean;

	constructor(canva: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canva = canva;
		this.ctx = ctx;
		this.pos = new GameVec(0, 0);
		this.dimension = new GameDimension(5, 5);
		this.velocity = 1.5;
		this.start_margin = 10;
		this.start_field = [
			this.start_margin,
			this.canva.height - this.start_margin
		];
	}

	update() {
		this.pos.add(this.direction.mult_vec(this.velocity))
	}

	start(left: boolean) {
		this.pos.x = Math.floor(this.canva.width / 2  - this.dimension.width / 2);
		this.pos.y = Math.floor(this.canva.height / 2 - this.dimension.height / 2);
		if ( left ){
			this.direction = GameVec.left();
		} else {
			this.direction = GameVec.right();
		}
	}

	getSide() {
		return this.start_side;
	}

	draw() {
		this.ctx.fillRect(
			this.pos.x,
			this.pos.y,
			this.dimension.width,
			this.dimension.height
		)
	}

	isOut() {
		return this.pos.x <= 0 || (this.pos.x > (this.canva.width - this.dimension.width));
	}

	wallCollide() {
		return this.pos.y <= 0 || (this.pos.y > (this.canva.height - this.dimension.height));
	}

	getDimension(): GameDimension {
		return this.dimension;
	}

	getPos(): GameVec {
		return this.pos;
	}
}