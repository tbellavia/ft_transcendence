import { GameDimension } from "./engine/dimension";
import { GameVec } from "./engine/gameVec";

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
		if (this.isOut()) {
			this.start_side = !this.start_side;
			this.start(this.start_side);
		}
		if ( this.collide() ) {
			this.start(this.start_side);
		}
	}

	start(left: boolean) {
		this.pos.x = Math.floor(this.canva.width / 2  - this.dimension.width / 2);
		this.pos.y = Math.floor(this.canva.height / 2 - this.dimension.height / 2);
		if ( left ){
			this.direction = GameVec.up();
		} else {
			this.direction = GameVec.down();
		}
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

	collide() {
		return this.pos.y <= 0 || (this.pos.y > (this.canva.height - this.dimension.height));
	}

}