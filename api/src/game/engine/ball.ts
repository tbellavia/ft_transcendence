import { GameDimension } from "./utils/dimension";
import { GameVec, radians } from "./utils/gameVec";
import { map, randomInt } from "./utils/utils";
import { Paddle } from "./paddle";
import { BALL_DIMENSION, BALL_VELOCITY } from "./utils/constants";
import { WallSide } from "./game";

export class Ball {
	private canva: GameDimension;
	private pos: GameVec;
	private dimension: GameDimension;
	private velocity: number;
	private speed: GameVec;
	private start_side: boolean;

	constructor(canva: GameDimension) {
		this.canva = canva;
		this.pos = new GameVec(0, 0);
		this.dimension = BALL_DIMENSION;
		this.velocity = BALL_VELOCITY;
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
	
	draw() { }
		
	isOut() : WallSide {
		if ( this.pos.x <= 0 ){
			return WallSide.LEFT;
		} else if ( this.pos.x > (this.canva.width - this.dimension.width) ) {
			return WallSide.RIGHT;
		}
		return WallSide.NONE;
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
}