import { Ball } from "./ball";
import { GameVec } from "./utils/gameVec";
import { Paddle } from "./paddle";
import { GameDimension } from "./utils/dimension";
import { GameUser } from "../interfaces/gameUser";
import { GAME_CANVA_DIMENSION } from "./utils/constants";

export enum WallSide {
  NONE = 0,
  LEFT = 1,
  RIGHT = 2
}

export class Game {
  private canva: GameDimension;
  private middle: GameVec;
  private paddleLeft: Paddle;
  private paddleRight: Paddle;
  private ball: Ball;
  private playerTurn: boolean;
  private started: boolean;
  private player_1: GameUser;
  private player_2: GameUser;
  private player_1_score: number;
  private player_2_score: number;

  constructor(player_1: GameUser, player_2: GameUser) {
    this.canva = GAME_CANVA_DIMENSION;
    this.player_1 = player_1;
    this.player_2 = player_2;
    this.player_1_score = 0;
    this.player_2_score = 0;
    this.middle = new GameVec(
      Math.floor(this.canva.width / 2),
      Math.floor(this.canva.height / 2)
    );
    this.paddleLeft = new Paddle(this.canva, true);
    this.paddleRight = new Paddle(this.canva, false);
    this.ball = new Ball(this.canva);
    this.playerTurn = true;
    this.ball.start(this.playerTurn);
    this.started = false;
  }


  start() {
    this.started = true;
  }

  // Check collide and update match
  /* -------------------------------------------------------------- */
  update() {
    if ( this.started ) {
      this.emitBallPos();
      this.ball.update();

      const outside = this.ball.isOut();
      if ( outside !== WallSide.NONE ) {
        if ( outside === WallSide.LEFT ){
          this.incRightScore();
        } else {
          this.incLeftScore();
        }
        this.emitScore();
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
  }

  emitBallPos() {
    const ball_pos = this.ball.getPos();

    this.player_1.socket.emit("ball-pos", { x: ball_pos.x, y: ball_pos.y });
    this.player_2.socket.emit("ball-pos", { x: ball_pos.x, y: ball_pos.y });
  }

  emitScore() {
    const left_score = this.player_1_score;
    const right_score = this.player_2_score;
    
    this.player_1.socket.emit("score", { left_score, right_score });
    this.player_2.socket.emit("score", { left_score, right_score });
  }

  incLeftScore() {
    this.player_1_score++;
  }

  incRightScore() {
    this.player_2_score++;
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