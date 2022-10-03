<template>
	<div class="game-div">

		<!-- CARD: timer before begining Game -->
		<v-dialog persistent v-if="timer" v-model="timer">
			<v-card center class="game-begin-timer">
				<v-card-title> MATCH BEGIN </v-card-title>
				<v-card-text>{{ timer }}</v-card-text>
			</v-card>
  		</v-dialog>

		<!-- CARD: display winner at the end of game -->
		<v-dialog persistent v-if="endGame" v-model="endGame">
			<v-card center class="game-begin-timer">
				<v-card-title> MATCH VICTORY </v-card-title>
				<v-card-text>{{ winnerUser }} won ! </v-card-text>
			</v-card>
		</v-dialog>

		<canvas  id="game-canvas" width="620" height="410" ></canvas>
	</div>
</template>

<script setup lang="ts">

import { Game } from '~~/classes/game/game';

const user =  getUserAuthenticate();
const socket = useSocketGame();
const endGame = ref(false);
const winnerUser = ref('');
const timer = ref();
// intervalle :


socket.value.on("game-start-timer", (remaining) => {
	timer.value = remaining;
})

socket.value.on("game-end", (winner) => {
     winnerUser.value = winner;
	 endGame.value = true;
	 const timer = setInterval(() => {
		if (timer > 0) {
			clearInterval(timer);
			user.value.isInGame = false;
		}
	}, 1000 * 5);
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
