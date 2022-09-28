<template>
<div class="game-page">
	<div v-if="user.isInGame() === true">
		<button class="friends-buttons" @click="subscribeMatchmaking()"> Play </button>
	</div>
	<div v-else>
		WESH
		<GameCanvas1 class= "game-container" :socket="socket" />
	</div>
</div>
</template>


<script setup lang="ts">
import GameCanvas1 from '../../components/game/GameCanvas.vue';

const socket = useSocketGame();
const user = await getRefreshedUserAuthenticate();

async function subscribeMatchmaking() {
	await user.value.generateGameSocket()
	socket.value.emit("subscribe");

	console.log("Subscribe !");	
}


// SOCKET EVENT 
// socket.value.on("waiting_player", () => {
// 	console.log("waiting_players")
// // })

socket.value.on("matched", ({username, id}) => {
	console.log(`${id} : Matched with ${username}`); //

	user.value.matchId = id;
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