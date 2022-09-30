<template>
<div class="game-page">
	<div v-if="user.isInGame() === true">
		<div class="friends-buttons">
			<button @click="changeView()"> SEE MATCH </button>
			<button class="friends-buttons" @click="subscribeMatchmaking()"> PLAY ! </button>
		</div>
		<div v-show="view">
			LIST MATCH
		</div>
	</div>
	<div v-else class="in-game" >
		<GameProfile />
		<div>
			<GameCanvas1 class="game-container" :socket="socket" />
		</div>
	</div>
</div>
</template>


<script setup lang="ts">
import GameCanvas1 from '../../components/game/GameCanvas.vue';
import GameProfile from '../../components/game/GameProfile.vue';

const socket = useSocketGame();
const user = await getRefreshedUserAuthenticate();
const view = ref(!user.value.isInGame());


async function subscribeMatchmaking() {
	await user.value.generateGameSocket()
	socket.value.emit("subscribe");
	view.value = false;

	console.log("Subscribe !");	
}

function changeView() {
	if (user.value.isInGame() === false)
		view.value = true;
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


	.in-game {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.game-page {
		width: 100%;
		height: 100%;
		left: 10%;
		/* position to fix */
		position: fixed;
	}

.game-container {
		width: 80%;
		height: 60%;
}

	.friends-buttons {
	display: flex;
	align-items: center;
}
.friends-buttons button {
		width: 150px;
		height: 50px;
		display: block;
		text-align: center;
	}
.friends-buttons button:active {
border: solid;
}
</style>