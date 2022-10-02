<template>
	<div class="game-profile">
			<div id="game-profile-player" class="player-left">
				<div class="game-profile-player-avatar">
					<img :src="playerLeft.avatar_url" alt="">
				</div>
					<h2> {{ playerLeft.username }} </h2>
				<h1 class="game-point"> {{ leftPoint }}</h1>
			</div> 
			<div>

			</div> 
			<div id="game-profile-player" class="player-right"> 
					<h1 class="game-point"> {{ rightPoint }}</h1>
					<h2> {{ playerRight.username }} </h2>
				<div class="game-profile-player-avatar">
					<img :src="playerRight.avatar_url" alt="">
				</div>
			</div>
	</div>
</template>


<script setup lang="ts">
const userAuth = await getRefreshedUserAuthenticate();
const match = ref(userAuth.value.getCurrentMatch());
const socket = useSocketGame();
const oponent = await useUser(match.value.oponent);
const leftPoint = ref(0);
const rightPoint = ref(0);

const playerLeft  = ref(match.value.left ? userAuth.value : oponent.value);
const playerRight = ref(match.value.left ? oponent.value : userAuth.value);


socket.value.on("score",  ({player1, player2, left_score, right_score }) => {
	leftPoint.value = left_score;
	rightPoint.value = right_score;
} )
	
</script>

<style scoped>

h2 {
	padding: 5%;
	align-self: center;
}
.game-profile-player-avatar {
	display: flex;
	align-self: center;

}
.game-profile {
 width: 80%;
 height: 20%;
 position: relative;
 display: flex;
 padding-bottom: 2%;
}

.player-left {
	width: 50%;
	height: 100%;
	display:flex;
}

.player-right {
	width: 50%;
	height: 100%;
	display:flex;
	justify-content: flex-end;
}

.player-left .game-point {
	text-align: right;
}

.game-point {
	width: 100%;
	padding: 5%;
	align-self: center;
	flex-grow: 3;
}

.game-profile-avatar {
	display: flex;
}
</style>