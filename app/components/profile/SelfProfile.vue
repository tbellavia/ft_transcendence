<template>
<suspense>
		<!-- <profilePublic :user=userAuthenticate/> -->
	<div class="profile-page">
		<!-- <profileSelfProfileHeader /> -->
		<div class="profile-header">
			<div class="profile-user-image"> <img :src="user.avatar_url"/> </div>
			<div class="profile-user-params">
				<div class="profile-name-rank">
					<h1 class="profile-username"> {{ user.username }}  </h1>
					<h2 class="profile-username"> rank: {{ user.stats.rank }}</h2>
					<v-space></v-space>
				</div>

				<div class="user-parameters-sub"> GAME total: {{ user.stats.game_total }} </div>
				<div class="user-parameters-sub"> GAME WON  : {{ user.stats.game_won }} </div>
				<div class="user-parameters-sub"> GAME LOOSE: {{ user.stats.game_total - user.stats.game_won - user.stats.game_abandonned }} </div>
				<v-space></v-space>
				<!-- <div class="user-parameters-sub"><authenticationDoubleAuthentication /></div>  -->
				 <div v-show="props.isUserAuth">
					<input v-model="newName" type="text" placeholder="new username" /> 
					<button @click="submitName()"> CLICK </button>
				</div>
			</div>

		</div>
		<div class="profile-match">
			<Suspense>
				<profileMatchHistory :user="user"/>
			</Suspense>
		</div>

	</div>
</suspense>
</template>
	



	<script setup lang="ts">
import { User } from '~~/classes/User.class';
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

let newName = ref();

async function submitName() {
	await user.value.updateUsername(newName.value);
	user.value.fetchAll();

}


const props = defineProps ({
	username:{
		type: String,
		required: true,
	}, 
	isUserAuth: {
		type: Boolean,
		required: true
	}
})

const user = await ( props.isUserAuth ? getUserAuthenticate() : useUser(props.username)) 

	</script>


	<style scoped>
	  div.user_parameters {
		width: 100%;
		display: flex;
		flex-direction: column;
	
	  }
	
	  div.user-parameters-sub {
		display: flex;
		width: 100%;
	  }

	  .profile-name-rank {
		display: flex;
		width: 100%;
		justify-content: space-between;
	  }
	</style>