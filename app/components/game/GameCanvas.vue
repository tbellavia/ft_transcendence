<template>
	<div class="game-div">
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
	game.draw();

	window.requestAnimationFrame(() => {
		gameLoop(game)
	})
}


onMounted (() => {
	const gameCanvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
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

.game-div {
	width: 80%;
	height: 100%;
}


#game-canvas {
	border: solid;
	z-index: 999;
	/* TODO: background black */
	background-color: transparent;
	width: 100%;
	height: 100%;
	object-fit: contain;

}
</style>
