<template>
	<div class="game-profile">
			<div id="game-profile-player" class="player-left"> 
				<v-avatar>
					<img :src="user.avatar_url" alt="">
				</v-avatar>{{ user.username }}</div>
			<div id="game-profile-player" class="player-right"> {{ userAuth.username }}</div>
	</div>
</template>


<script setup lang="ts">
import { anyTypeAnnotation } from '@babel/types';
import { Match } from '~/interfaces/game.interface';

const userAuth = getUserAuthenticate();
const user = await useUser(props.match.username);

const props = defineProps({
	match:  {
		required: true,
	}
})

console.log(props.match);



</script>

<style scoped>
.game-profile {
 width: 80%;
 height: 20%;
 position: relative;
 display: flex;
}

#game-profile-player {
	width: 50%;
	height: 100%;
	display:flex;
	border: solid;
}


.player-left {
}

.player-right {

}
</style>