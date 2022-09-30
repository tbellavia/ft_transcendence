<template>
	<div class="game-container">
		<canvas  id="game-canvas" ></canvas>
	</div>
</template>

<script setup lang="ts">
import { Game } from '~~/classes/game/game';

const props = defineProps({
	socket: {
		required: true,
	}
})


function gameLoop(game: Game) {
	game.update()
	game.draw();
	window.requestAnimationFrame(() => {
		gameLoop(game)
	})
}


onMounted (() => {
	const gameCanvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
	
	gameCanvas.width = window.innerWidth / 1.5;
      gameCanvas.height = window.innerHeight / 1.5;
	const game = new Game(gameCanvas);


	document.addEventListener("keydown", (event) => {
		console.log(event);
		game.keypressEvent(event);

	});

	document.addEventListener("keyup", (event) => {
		game.keyupEvent();
	});

	gameLoop(game);
	
})
</script>

<style scoped>


.game-container {

		position: relative;
		left: 10%;
		top: 5%;
		width: 650px;
		height: 480px;
	}

#game-canvas {
	border: solid;
	z-index: 999;
	/* TODO: background black */
	background-color: black;
	object-fit: contain;
	width: 100%;
	height: 100%;
}
</style>
