<template>
	<!-- <gameMatchmaking /> -->
	<div v-if="user.isInGame() === false">
		<button class="friends-buttons" @click="subscribeMatchmaking()"> Play </button>
	</div>
	<div v-else>
		WESH
		<GameCanvas1 />
	</div>
</template>


<script setup lang="ts">
import GameCanvas1 from '../../components/game/GameCanvas.vue';


const user = await getRefreshedUserAuthenticate();
const socket = user.value.gameSocket;

console.log(user.value.isInGame())
console.log("SOCKET: ",user.value.gameSocket)
async function subscribeMatchmaking() {
	await user.value.generateGameSocket()
	user.value.gameSocket.emit("subscribe");

	console.log("Subscribe !");	
}


// SOCKET EVENT 
// socket.value.on("waiting_player", () => {
// 	console.log("waiting_players")
// // })

socket.on("matched", ({username, id}) => {
	console.log(`${id} : Matched with ${username}`); //

	user.value.matchId = id;
});





</script>