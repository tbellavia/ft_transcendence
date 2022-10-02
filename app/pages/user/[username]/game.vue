<template>
<div class="game-page">
	<div v-if="user.isInGame === false || user.waitingAcceptingMatch === false">
		<div v-show="!waiting" class="friends-buttons">
			<button @click="view = !view"> SEE MATCH </button>
			<button class="friends-buttons" @click="subscribeMatchmaking()"> PLAY ! </button>
		</div>
		<div v-show="view" class="profile-match-body">
			<!-- <div class="list-match" v-for="match in onlineMatch"> -->
			<div class="list-match" v-for="match in onlineMatch">
				<button style="width:100%;" @click="showThisRoom(match)">
					<ListInGameItem />
				</button>
			</div>
		</div>
		<div v-show="waiting">
			RESEARCH A PLAYER
		</div>
		<div v-show="user.waitingAcceptingMatch">
			Waiting acceptation from {{ user.waitingPlayerGame }}
		</div>
	</div>
	<div v-else class="in-game" >
		<Suspense >
		<GameProfile />
	</Suspense>
		<div>
			<GameCanvas1 :socket=socket class="game-container" />
		</div>
	</div>
</div>
</template>


<script setup lang="ts">
import GameCanvas1 from '../../components/game/GameCanvas.vue';
import GameProfile from '../../components/game/GameProfile.vue';
import ListInGameItem from '~~/components/game/ListInGameItem.vue';

const socket = useSocketGame();
const user = await getRefreshedUserAuthenticate();
const view = ref(false);
const waiting = ref(false);

// const onlineMatch = await getOnlineMatch();
const onlineMatch = 20;


/**
 * Subscribe user to matchmaking.
 */
async function subscribeMatchmaking() {
	socket.value.emit("subscribe");
	view.value = false;
	waiting.value = true;
}

/**
 * User has been matched with another user.
 */
socket.value.on("matched", ({username, id, left}) => {
	waiting.value = false;
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
		width: 80%;
		height: 100%;
		left: 10%;
		/* position to fix */
		position: fixed;
	}

	.profile-match-body {
		width: 60%;
		min-width: 500px;
		height: 50vh;
		overflow-y: scroll;
		overflow-x: none;
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
