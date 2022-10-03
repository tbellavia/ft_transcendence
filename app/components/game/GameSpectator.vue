<template>
	<div class="game-div">


		<!-- CARD: display winner at the end of game -->
		<v-dialog persistent v-model="endGame">
			<v-card center class="game-begin-timer">
				<v-card-title> MATCH VICTORY </v-card-title>
				<v-card-text>{{ winnerUser }} won ! </v-card-text>
			</v-card>
		</v-dialog>

		<canvas  id="game-canvas" ></canvas>
	</div>
</template>

<script setup lang="ts">

import { Game } from '~~/classes/game/game';
import gameVue from '~~/pages/user/[username]/game.vue';

const user =  getUserAuthenticate();
const socket = useSocketGame();
const endGame = ref(false);
const winnerUser = ref('');

// intervalle :




socket.value.on("spectator-game-end", (winner) => {
     winnerUser.value = winner;
	 endGame.value = true;
	 const timer = setInterval(() => {
		if (timer > 0) {
			clearInterval(timer);
			socket.value.emit("spectator-unsubscribe")
			user.value.isSpectator = false;
			navigateTo(`/user/${user.value.username}/profile`)
		}
	}, 1000 * 5);
})


onMounted (() => {
	const gameCanvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
	const game = new Game(gameCanvas, socket.value, true);

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


</style>
