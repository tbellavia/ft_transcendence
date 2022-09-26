<template>
<div >
	<h2>MATCH HISTORY</h2>
	<div class="list-match" v-for="match in matchs">
		<profileMatchItem :match="match" :user="props.user" />
		
	</div>
</div>
</template>

<script setup lang="ts">
import { User } from '~~/classes/User.class';


const props = defineProps ({
	user: User,
})

const matchs = ref(await useApi("/users/matches/all"));

console.log("MATCH= ", matchs.value);

// function getDisplayedMatchInfos(match: any) {
// 	player_name.value = getPlayerName(match);
// 	// match_result.value = getMatchResult(match, player_name.value);
		
// }

// function getMatchResult(match: any, player_name: string) {
// 	if (match.user_1.username === userApi,user) {
// 		return 
// 	}
// }


// function getPlayerName(match: any) { //TODO make match interface 
// 	if (match.user_1.username === userApi.user)
// 		return match.user_2.username;
// 	return match.user_1.username;
// }

// function getMessage(match: any) {
// 	if (match.)
// }

//-- -------------------------------------------------------------- -->

</script>


<style scoped>
.list-match {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.match-user-image {
	width: 40px;
	height: 40px;
	display: flex;
}

.match-user-name {

}

</style>