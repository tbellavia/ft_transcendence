import { Ball } from "./ball";
import { GameVec } from "./utils/gameVec";
import { Paddle } from "./paddle";
import { GameDimension } from "./utils/dimension";

export class Game {
  private canva: GameDimension;
  private middle: GameVec;
  private paddleLeft: Paddle;
  private paddleRight: Paddle;
  private ball: Ball;
  private playerTurn: boolean;

  constructor(canva: GameDimension) {
    this.canva = canva;
    this.middle = new GameVec(
      Math.floor(this.canva.width / 2),
      Math.floor(this.canva.height / 2)
    );
    this.paddleLeft = new Paddle(this.canva, true);
    this.paddleRight = new Paddle(this.canva, false);
    this.ball = new Ball(this.canva);
    this.playerTurn = true;
    this.ball.start(this.playerTurn);
  }


  // Check collide and update match
  /* -------------------------------------------------------------- */
  update() {
    this.ball.update();
    if (this.ball.isOut()) {
      this.playerTurn = !this.playerTurn;
      this.ball.start(this.playerTurn);
    }
    else if ( this.ball.wallCollide() ) {
      this.ball.wallBounce();
      }
    else if ( this.paddleLeft.collide(this.ball) ) {
      this.ball.bounceLeft(this.paddleLeft);
    }
    else if ( this.paddleRight.collide(this.ball) ) {
      this.ball.bounceRight(this.paddleRight);
    }
  }

  setLeftPaddlePos(y: number) {
    this.paddleLeft.setPos(y);
  }

  setRightPaddlePos(y: number) {
    this.paddleRight.setPos(y);
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