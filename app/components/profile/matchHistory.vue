<template>
<div >
	<h2>MATCH HISTORY</h2>
	<div class="list-match" v-for="match in matchs">
		<div class="match-user-image"> <img :src="urlAvatar"/> </div>
		<div class="match-user-name" >	</div>
		<div>{{ getMessage(match) }}</div> 
	</div>
</div>
</template>

<script setup lang="ts">
import { getAllDependencies } from 'vue-bundle-renderer/runtime';

const userApi = await useUserApi("Lylian");
const matchs = ref(await useApi("/users/matches/all"));

console.log("MATCH= ", matchs.value);


let player_name = ref("");
let match_result = ref("");


function getDisplayedMatchInfos(match: any) {
	player_name.value = getPlayerName(match);
	// match_result.value = getMatchResult(match, player_name.value);
		
}

// function getMatchResult(match: any, player_name: string) {
// 	if (match.user_1.username === userApi,user) {
// 		return 
// 	}
// }


function getPlayerName(match: any) { //TODO make match interface 
	if (match.user_1.username === userApi.user)
		return match.user_2.username;
	return match.user_1.username;
}

function getMessage(match: any) {
	if (match.)
}

//-- -------------------------------------------------------------- -->

async function displayAvatar() { // TODO get avatar from user in match
	let avatar = await getAvatar("Lylian");
	return URL.createObjectURL(avatar);
}

const urlAvatar = ref(await displayAvatar());

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