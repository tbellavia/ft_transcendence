<template>
<div class="game-page">
	<div v-if="user.isInGame === false">
		<button class="friends-buttons" @click="subscribeMatchmaking()"> Play </button>
	</div>
	<div v-else>
		<GameCanvas1 class= "game-container" :socket="socket" />
	</div>
</div>
</template>


<script setup lang="ts">
import { use } from 'h3';
import GameCanvas1 from '../../components/game/GameCanvas.vue';

const socket = useSocketGame();
const user = await getRefreshedUserAuthenticate();

/**
 * Subscribe user to matchmaking.
 */
async function subscribeMatchmaking() {
	await user.value.generateGameSocket()
	socket.value.emit("subscribe");

	console.log("Subscribe !");	
}

/**
 * User has been matched with another user.
 */
socket.value.on("matched", ({username, id, left}) => {
	const side = (left) ? "left" : "right";
	console.log(`You have been matched with ${username} and you play ${side}`);

	user.value.setMatch(id, username, left);
});

onMounted (() => {

});

</script>

<style scoped>
	.game-container {
		width: 80%;
		height: 80%;
	}
	.game-page {
		width: 100%;
		height: 100%;
		left: 10%;
		position: fixed;
	}
</style>