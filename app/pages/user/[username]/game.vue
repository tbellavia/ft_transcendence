<template>
<div class="game-page">

	<!-- HEADER: Button option -->
	<div v-if="user.isInGame === false" >
	<!-- //  || user.waitingAcceptingMatch === false"> -->
		<div v-show="!waiting" class="friends-buttons">
			<button @click="view = !view"> SEE MATCH </button>
			<button class="friends-buttons" @click="subscribeMatchmaking()"> PLAY ! </button>
		</div>

		<!-- list match in game -->
		<div v-show="view" class="profile-match-body">
			<!-- <div class="list-match" v-for="match in onlineMatch"> -->
			<div class="list-match" v-for="match in onlineMatch">
				<button style="width:100%;" @click="showThisRoom(match)">
					<ListInGameItem />
				</button>
			</div>
		</div>

		<!-- waiting match making result  -->
		<v-dialog persistent v-if="waiting" v-model="waiting">
			<v-card center class="game-begin-timer">
			<v-card-title>Waiting Player </v-card-title>
			<v-card-actions class="cancel-buttons">
				<v-progress-circular
					indeterminate
					color="CurrentColor"
				></v-progress-circular>
     		   <v-btn  @click.stop="unsubscribeMatchmaking()">Cancel</v-btn>
     		 </v-card-actions>
			</v-card>
		</v-dialog>

		<!-- waiting accepting match for suggest match -->
		<div v-show="user.waitingAcceptingMatch">
			Waiting acceptation from {{ user.waitingAcceptingMatch }}
		</div>
	</div>

	<!-- USER GAME after match making -->
	<div v-else class="in-game" >
		<Suspense >
		<GameProfile />
	</Suspense>
		<div>
			<GameCanvas1 class="game-container" />
		</div>
	</div>
</div>
</template>


<script setup lang="ts">
import GameProfile from '~~/components/game/GameProfile.vue';
import ListInGameItem from '~~/components/game/ListInGameItem.vue';
import GameCanvas1 from '~~/components/game/GameCanvas.vue';

const socket = useSocketGame();
const user = await getRefreshedUserAuthenticate();
const view = ref(false);
const waiting = ref(false);
// const dpr

// const onlineMatch = await getOnlineMatch();
const onlineMatch = 2;


/**
 * Subscribe user to matchmaking.
 */
async function subscribeMatchmaking() {
	socket.value.emit("subscribe");
	view.value = false;
	waiting.value = true;
}

async function unsubscribeMatchmaking() {
	socket.value.emit("unsubscribe");
	waiting.value = false;
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

.cancel-buttons {
  display: flex;
  justify-content: space-evenly;
 }
</style>
