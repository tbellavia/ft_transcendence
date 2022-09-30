<template>
<div class="game-page">
	<div v-if="user.isInGame === false">
		<div class="friends-buttons">
			<button @click="view = true"> SEE MATCH </button>
			<button class="friends-buttons" @click="subscribeMatchmaking()"> PLAY ! </button>
		</div>
		<div v-show="view">
			LIST MATCH
		</div>
	</div>
	<div v-else class="in-game" >
		<GameProfile  />
		<div>
			<GameCanvas1 :socket=socket class="game-container" />
		</div>
	</div>
</div>
</template>


<script setup lang="ts">
import GameCanvas1 from '../../components/game/GameCanvas.vue';
import GameProfile from '../../components/game/GameProfile.vue';
import { Match } from '~/interfaces/game.interface';

const socket = useSocketGame();
const user = await getRefreshedUserAuthenticate();
const match = ref(undefined);
const view = ref(false);

async function subscribeMatchmaking() {
	socket.value.emit("subscribe");
	view.value = false;

	console.log("Subscribe !");	
}

socket.value.on("matched", ({ username, id, left }) => {
	console.log(`${id} : Matched with ${username} and you are left: ${left}`);
	user.value.setMatch(id, username, left);
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
		height: 80%; 
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
