import { Ball } from "./ball";
import { getCanvasRatio, getRatio, PADDLE_DIMENSION, PADDLE_MARGIN, PADDLE_VELOCITY, PADDLE_WALL_MARGIN } from "./engine/constants";
import { constrain } from "./engine/constrain";
import { GameDimension } from "./engine/dimension";
import { GameVec } from "./engine/gameVec";

export enum PaddleStage {
	UP = 1,
	MIDDLE,
	DOWN,
}

export class Paddle {
	private canva: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private margin: number;
	private pos: GameVec;
	private dimension: GameDimension;
	private velocity: number;
	private side: boolean;
	private third: number;
	private wall_margin: number;
	private ratio: GameVec;

	constructor(canva: HTMLCanvasElement, ctx: CanvasRenderingContext2D, left: boolean){
		this.canva = canva;
		this.ctx = ctx;
		this.margin = PADDLE_MARGIN;
		this.wall_margin = PADDLE_WALL_MARGIN;
		this.pos = new GameVec(0, 0);
		this.dimension = PADDLE_DIMENSION;
		this.third = Math.floor(this.dimension.height / 3);
		this.side = left;

		this.pos.y = Math.floor(this.canva.height / 2 - this.dimension.height / 2);
		this.velocity = PADDLE_VELOCITY;
		this.ratio = getCanvasRatio(canva);
		
		this.scale();

		if ( left ) {
			this.pos.x = this.margin;
		} else {
			this.pos.x = this.canva.width - this.margin - this.dimension.width;
		}
	}


	scale() {
		this.scaleSize();
		this.scaleVelocity();
		this.scaleMargin();
		this.scaleWallMargin();
	}

	// Draw and update position
  	/* -------------------------------------------------------------- */
	draw() {
		this.ctx.fillRect(
			this.pos.x,
			this.pos.y,
			this.dimension.width,
			this.dimension.height
		)
	}

	up() {
		this.pos.y = constrain(
			this.pos.y - this.velocity, 
			this.wall_margin, 
			this.canva.height - this.dimension.height - this.wall_margin
		);
	}

	down() {
		this.pos.y = constrain(
			this.pos.y + this.velocity, 
			this.wall_margin, 
			this.canva.height - this.dimension.height - this.wall_margin
		);
	}

	// Getter
	/* -------------------------------------------------------------- */
	getPos() : GameVec {
		return this.pos;
	}

	setPos(y: number) {
		this.pos.y = constrain(
			y,
			this.wall_margin,
			this.canva.height - this.dimension.height - this.wall_margin
		);
	}

	getDimension() : GameDimension {
		return this.dimension;
	}

	isLeft() : boolean {
		return (this.side);
	}

	scaleSize() {
		this.dimension.width = this.dimension.width * this.ratio.x;
		this.dimension.height = this.dimension.height * this.ratio.y;
	}

	scaleVelocity() {
		this.velocity = this.velocity * this.ratio.y;
	}

	scaleMargin() {
		this.margin = this.margin * this.ratio.x;
	}

	scaleWallMargin() {
		this.wall_margin = this.wall_margin * this.ratio.y;
	}

	// Check Ball collide
	/* -------------------------------------------------------------- */
	isInsideHeight (ball: Ball) : boolean {
		const ball_pos = ball.getPos();
		const ball_dim = ball.getDimension();

		// inside paddle
		if (ball_pos.y + ball_dim.height > this.pos.y && ball_pos.y < this.pos.y + this.dimension.height) {
			// higth part
			if( ball_pos.y + ball_dim.height < this.pos.y + this.third )
				return true;
			// middle part
			if (ball_pos.y + ball_dim.height < this.pos.y + this.dimension.height - this.third)
				return true;
			// down part
			return true;
		}
		return false;
	}
	
	collide(ball: Ball) : boolean {
		const ball_pos = ball.getPos();
		const ball_dim = ball.getDimension();
		const inside_height = this.isInsideHeight(ball);

		if (this.isLeft()) {
			if (ball_pos.x < this.pos.x + this.dimension.width) {
				return inside_height;
			}
		}
		else {
			if (ball_pos.x + ball_dim.width > this.pos.x)
				return inside_height;
		}
		return false;
	}
}