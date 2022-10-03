import { Socket } from "socket.io-client";
import { Ball } from "./ball";
import { GAME_CANVA_DIMENSION, getCanvasRatio, getRatio } from "./engine/constants";
import { GameDimension } from "./engine/dimension";
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
  private socket: Socket;
  private left: boolean;
  private dpr: number;
  private ratio: GameVec;

  constructor(canva: HTMLCanvasElement, socket: Socket, left: boolean) {
    // ratio for each window
    this.dpr = window.devicePixelRatio || 1;
    var rect = canva.getBoundingClientRect();
    canva.width = rect.width * this.dpr;
    canva.height = rect.height * this.dpr;

    this.keyPressed = "";
    this.canva = canva;
    this.ctx = this.canva.getContext("2d") as CanvasRenderingContext2D;
    this.width = this.canva.width;
    this.height = this.canva.height;
    this.middle = new GameVec(
      Math.floor(this.width / 2),
      Math.floor(this.height / 2)
    );
    this.paddleLeft = new Paddle(canva, this.ctx, true);
    this.paddleRight = new Paddle(canva, this.ctx, false);
    this.ball = new Ball(this.canva, this.ctx);
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "white";
    this.playerTurn = true;
    this.ball.start(this.playerTurn);
    this.socket = socket;
    this.left = left;
    this.ratio = getCanvasRatio(this.canva);

    this.setSocketListeners();
  }

  setSocketListeners() {
    this.socket.on("paddle-move-up", () => {
      if ( this.left ) {
        this.paddleRight.up();
      } else {
        this.paddleLeft.up();
      }
    });

    this.socket.on("paddle-move-down", () => {
      if ( this.left ) {
        this.paddleRight.down();
      } else {
        this.paddleLeft.down();
      }
    });

    this.socket.on("ball-pos", ({x, y}) => {
      this.ball.setPos(new GameVec(x, y));
    });


    this.socket.on("game-state", ({ball_pos, left_paddle_pos, right_paddle_pos}) => {
      this.ball.setPos(new GameVec(
        ball_pos.x,
        ball_pos.y,
      ));

      this.paddleLeft.setPos(
        left_paddle_pos * this.ratio.y
      );

      this.paddleRight.setPos(
        right_paddle_pos * this.ratio.y
      );
    })

  }

  scale() {
    this.ball.scale();
    this.paddleLeft.scale();
    this.paddleRight.scale();
  }

  start() {
    this.update();
    this.draw();

    window.requestAnimationFrame(() => {
      this.start();
    });
  }

  // Check collide and update match
  /* -------------------------------------------------------------- */
  update() {

    // this.ball.update();
    // if (this.ball.isOut()) {
    //   this.playerTurn = !this.playerTurn;
    //   this.ball.start(this.playerTurn);
    // }
    // else if ( this.ball.wallCollide() ) {
    //   this.ball.wallBounce();
    //   }
    // else if ( this.paddleLeft.collide(this.ball) ) {
    //   this.ball.bounceLeft(this.paddleLeft);
    // }
    // else if ( this.paddleRight.collide(this.ball) ) {
    //   this.ball.bounceRight(this.paddleRight);
    // }
  }

  // Draw and clear Canva
  /* -------------------------------------------------------------- */
  resize() {
    var dpr = window.devicePixelRatio || 1;
    if (this.dpr != dpr) {
      var rect = this.canva.getBoundingClientRect();
      this.canva.width = rect.width * dpr;
      this.canva.height = rect.height * dpr;
    }
  }

  draw() {
    this.resize();
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
      if ( this.left ) {
        this.upLeft();
      } else {
        this.upRight();
      }
    } else if ( this.keyPressed == "ArrowDown" ) {
      if ( this.left ) {
        this.downLeft();
      } else {
        this.downRight();
      }
    }
  }

  // Event Key from user
  /* -------------------------------------------------------------- */

  keypressEvent(event: KeyboardEvent) {
    this.keyPressed = event.key;
  }

  keyupEvent(event) {
    if (this.keyPressed === event.key)
      this.keyPressed = "";
  }

  upLeft() {
    if ( this.left ) {
      this.paddleLeft.up();
      this.emitPaddleMoveUp();
    }
  }

  upRight() {
    if ( !this.left ) {
      this.paddleRight.up();
      this.emitPaddleMoveUp();
    }
  }

  downLeft() {
    if ( this.left ){
      this.paddleLeft.down();
      this.emitPaddleMoveDown();
    }
  }

  downRight() {
    if ( !this.left ) {
      this.paddleRight.down();
      this.emitPaddleMoveDown();
    }
  }

  setOpponentPaddlePos(y: number) {
    // TODO: Normalize position the current screen size
    if ( this.left ) {
      this.paddleRight.setPos(y);
    } else {
      this.paddleLeft.setPos(y);
    }
  }

  async emitPaddleMoveUp() {
    this.socket.emit("paddle-move-up");
  }

  async emitPaddleMoveDown() {
    this.socket.emit("paddle-move-down");
  }

  // TODO: Delete ?
  emitPaddleLeftPos() {
    this.socket.emit("update-paddle-pos", this.paddleLeft.getPos().y);
  }

  emitPaddleRightPos() {
    this.socket.emit("update-paddle-pos", this.paddleRight.getPos().y);
  }
}