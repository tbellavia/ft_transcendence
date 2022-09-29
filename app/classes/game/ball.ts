import { GameDimension } from "./engine/dimension";
import { GameVec, radians } from "./engine/gameVec";
import { map, randomInt } from "./engine/utils";
import { Paddle, PaddleStage } from "./paddle";

export class Ball {
	private canva: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private pos: GameVec;
	private dimension: GameDimension;
	private velocity: number;
	private speed: GameVec;
	private start_margin: number;
	private start_side: boolean;

	constructor(canva: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canva = canva;
		this.ctx = ctx;
		this.pos = new GameVec(0, 0);
		this.dimension = new GameDimension(10, 10);
		this.velocity = 5;
		this.start_margin = 10;
		this.speed = new GameVec(this.velocity, this.velocity);
	}

	update() {
		this.pos.x += this.speed.x;
		this.pos.y += this.speed.y;
	}

	start(left: boolean) {
		this.pos.x = Math.floor(this.canva.width / 2  - this.dimension.width / 2);
		this.pos.y = Math.floor(this.canva.height / 2 - this.dimension.height / 2);
		const angle = radians(randomInt(-20, 20));

		this.speed.x = this.velocity * Math.cos(angle);
		this.speed.y = this.velocity * Math.sin(angle);

		if ( Math.random() < 0.5 ) {
			this.speed.x *= -1;
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
		return this.dimension.copy();
	}
	
	getPos(): GameVec {
		return this.pos.copy()
	}

	bounceLeft(paddle: Paddle) {
		const ppos = paddle.getPos();
		const pdim = paddle.getDimension();

		const diff = this.pos.y - (ppos.y - pdim.height / 2);
		const rad = radians(45);
		const angle = map(diff, 0, pdim.height, -rad, rad);
		this.speed.x = this.velocity * Math.cos(angle);
		this.speed.y = this.velocity * Math.sin(angle);
		this.pos.x = ppos.x + pdim.width / 2 + this.dimension.width;
	}

	bounceRight(paddle: Paddle) {
		const ppos = paddle.getPos();
		const pdim = paddle.getDimension();

		const diff = this.pos.y - (ppos.y - pdim.height / 2);
		const angle = map(diff, 0, pdim.height, radians(225), radians(135));
		this.speed.x = this.velocity * Math.cos(angle);
		this.speed.y = this.velocity * Math.sin(angle);
		this.pos.x = ppos.x - pdim.width / 2 - this.dimension.width;
	}

	wallBounce() {
		this.speed.y *= -1;
	}

	async debugStop() {
		this.velocity = 0;
		await delay(2000);
		this.velocity = 2;
	}
} // end of class
	
	
function delay(ms: number) {
	return new Promise( resolve => setTimeout(resolve, ms) );
}