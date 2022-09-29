import { Ball } from "./ball";
import { GameVec } from "./engine/gameVec";
import { Paddle } from "./paddle";

export class Game {
  private canva: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private middle: GameVec;
  private paddleLeft: Paddle;
  private paddleRight: Paddle;
  private ball: Ball;
  private keyPressed: String;
  private playerTurn: boolean;

  constructor(canva: HTMLCanvasElement) {

    // ratio for each window
    var dpr = window.devicePixelRatio || 1;
    var rect = canva.getBoundingClientRect();
    canva.width = rect.width * dpr;
    canva.height = rect.height * dpr;

    this.keyPressed = "";
    this.canva = canva;
    this.ctx = this.canva.getContext("2d") as CanvasRenderingContext2D;
    this.width = this.canva.width;
    this.height = this.canva.height;
    this.middle = new GameVec(
      Math.floor(this.width / 2),
      Math.floor(this.height / 2)
    );
    this.paddleLeft = new Paddle(this.canva, this.ctx, true);
    this.paddleRight = new Paddle(this.canva, this.ctx, false);
    this.ball = new Ball(this.canva, this.ctx);
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "white";
    this.playerTurn = true;
    this.ball.start(this.playerTurn);
  }


  // Check collide and update match
  /* -------------------------------------------------------------- */
  update() {
    this.ball.update();
    if ( this.ball.isOut() ){

    }
    if (this.ball.isOut()) {
      this.playerTurn = !this.playerTurn;
      this.ball.start(this.playerTurn);
    }
    if ( this.ball.wallCollide() ) {
      this.ball.start(true);
    }
    const left_collide = this.paddleLeft.collide(this.ball);
    const right_collide = this.paddleRight.collide(this.ball);
    if ( left_collide ) {
      this.ball.bounceLeft(left_collide);
    }
    else if ( right_collide ) {
      this.ball.bounceRight(right_collide);
    }
  }

  // Draw and clear Canva
  /* -------------------------------------------------------------- */

  draw() {
    this.clear();
    this.drawMoving();
    this.drawCenterLine();
    this.paddleLeft.draw();
    this.paddleRight.draw();
    this.ball.draw();
  }

  clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawCenterLine() {
    this.ctx.setLineDash([3, 2]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.middle.x, 0);
        this.ctx.lineTo(this.middle.x, this.height);
        this.ctx.stroke();
  }
  
  drawMoving() {
	if ( this.keyPressed == "ArrowUp" ) {
	  this.upLeft();
	} else if ( this.keyPressed == "ArrowDown" ) {
	  this.downLeft();
	} else if ( this.keyPressed == "ArrowLeft" ) {
	  this.upRight();
	} else if ( this.keyPressed == "ArrowRight" ) {
	  this.downRight();
	}
  }

  // Event Key from user
  /* -------------------------------------------------------------- */

  keypressEvent(event: KeyboardEvent) {
    this.keyPressed = event.key;
  }

  keyupEvent() {
    this.keyPressed = "";
  }

  upLeft() {
    this.paddleLeft.up();
  }

  upRight() {
    this.paddleRight.up();
  }

  downLeft() {
    this.paddleLeft.down();
  }

  downRight() {
    this.paddleRight.down();
  }
}