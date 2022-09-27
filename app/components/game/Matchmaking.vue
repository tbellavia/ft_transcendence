<template>
	<div>
		<button class="friends-buttons" @click="subscribeMatchmaking()"> Play </button>
	</div>
</template>


<script setup lang="ts">
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

const user = await getRefreshedUserAuthenticate();
const socket = useSocketGame();
const socket1 = useSocketGame();
const socket2 = useSocketGame();
const socket3 = useSocketGame();
const socket4 = useSocketGame();


async function subscribeMatchmaking() {
	socket.value.emit("subscribe");

	console.log("Subscribe !");	
}


// SOCKET EVENT 
// socket.value.on("waiting_player", () => {
// 	console.log("waiting_players")
// })

socket.value.on("matched", ({username, id}) => {
	console.log(`${id} : Matched with ${username}`);
	navigateTo(`/${user.value.username}/game/${username}`)

});





</script>
