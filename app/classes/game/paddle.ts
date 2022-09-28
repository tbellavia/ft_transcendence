import { constrain } from "./engine/constrain";
import { GameVec } from "./engine/gameVec";

export class Paddle {
	private canva: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private margin: number;
	private pos: GameVec;
	private width: number;
	private height: number;
	private velocity: number;

	constructor(canva: HTMLCanvasElement, ctx: CanvasRenderingContext2D, left: boolean){
		this.canva = canva;
		this.ctx = ctx;
		this.margin = 7;
		this.pos = new GameVec(0, 0);
		this.width = 5;
		this.height = 25;
		if ( left ) {
			this.pos.x = this.margin;
		} else {
			this.pos.x = this.canva.width - this.margin - this.width;
		}
		this.pos.y = Math.floor(this.canva.height / 2 - this.height / 2);
		this.velocity = 2;
	}

	draw() {
		console.log(`x=${this.pos.x} y=${this.pos.y}`);
		this.ctx.fillRect(
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		)
	}

	up() {
		this.pos.y = constrain(
			this.pos.y - this.velocity, 
			0, 
			this.canva.height - this.height
		);
	}

	down() {
		this.pos.y = constrain(
			this.pos.y + this.velocity, 
			0, 
			this.canva.height - this.height
		);
	}
}