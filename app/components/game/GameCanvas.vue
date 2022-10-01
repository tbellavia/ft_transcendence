<template>
	<div class="game-div">
		<v-dialog disabled="timer?" v-if="timer" v-model="timer">
			<v-card center class="game-begin-timer">
			<v-card-title> MACH BEGIN </v-card-title>
			<v-card-text>{{ timer }}</v-card-text>
			</v-card>
  		</v-dialog>

		<canvas  id="game-canvas" ></canvas>
	</div>
</template>

<script setup lang="ts">

import { Game } from '~~/classes/game/game';

const user = await getRefreshedUserAuthenticate();
const socket = useSocketGame();

// intervalle :

const timer = ref();

socket.value.on("game-start-timer", ({ remaining }) => {
	timer.value = remaining;
})

onMounted (() => {
	const gameCanvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
	const game = new Game(gameCanvas, socket.value, user.value.currentMatch.left);
	
	document.addEventListener("keydown", (event) => {
		game.keypressEvent(event);
	});
	
	document.addEventListener("keyup", (event) => {
		game.keyupEvent(event);
	});
	game.start();
})

</script>

<style scoped>

.game-div {
	width: 80%;
	height: 100%;
}


#game-canvas {
	/* border: solid; */
	z-index: 999;
	background-color: black;
	width: 100%;
	height: 100%;
	object-fit: contain;

}

.game-begin-timer {
	display: block;
	opacity: 80%;
	color: var(--main-color-light);
	background-color: var(--main-color-opacity-10);
	border: thin solid;
	text-align: center;
}

v-dialog {

}
</style>
