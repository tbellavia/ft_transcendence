import Paddle from "./classPaddle";

export default class Game {
	// H: number;
	// W: number;


	gameCanvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	// player1_paddle: Paddle;
	// player2_paddle: Paddle;

	player1_score: number = 0;
	player2_score: number = 0;
	
	constructor(truc: string) {
  		// Get the device pixel ratio, falling back to 1.
		var dpr = window.devicePixelRatio || 1;

		this.gameCanvas = document.getElementById("pong-game") as HTMLCanvasElement;
		
		// Get the size of the canvas in CSS pixels.
 		 var rect = this.gameCanvas.getBoundingClientRect();

		// Give the canvas pixel dimensions of their CSS
		// size * the device pixel ratio.
		 this.gameCanvas.width = rect.width * dpr;
		 this.gameCanvas.height = rect.height * dpr;

		this.ctx = this.gameCanvas.getContext("2d") as CanvasRenderingContext2D;
  
		if (this.ctx != null) {
		  this.ctx.fillStyle="white";
		  this.ctx.fillRect(10,this.gameCanvas.height / 2 - 80,15,80);
		  this.ctx.fillRect(this.gameCanvas.width -15 -10,this.gameCanvas.height / 2 - 80,15,80);
		  this.ctx.fillText("coucou", 800, 15);
		}
	}

	draw() {

		// this.player1_paddle.draw();
		// this.player2_paddle.draw();
	}
}