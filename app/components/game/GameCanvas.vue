<template>
	<div class="game-div">
		<canvas  id="game-canvas" ></canvas>
	</div>
</template>

<script setup lang="ts">

import { Game } from '~~/classes/game/game';

const props = defineProps({ socket: { required: true, } })
const user = await getRefreshedUserAuthenticate();

onMounted (() => {
	const gameCanvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
	const game = new Game(gameCanvas, props.socket, user.value.currentMatch.left);
	
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
</style>
