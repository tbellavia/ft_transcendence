<template>
	<div v-if="props.username" class=Profile >
		<div class="userDatas">
			<!-- <div class="userImage"> <img src="data:avatar'.base64_encode($blob).'"/> </div> -->
			<div class="userImage"> <img :src="avatar"/> </div>
			<div class="userName"> {{ user.username }}</div>
		</div> 
		<div class="rank"> rank </div>
		<div class="OptionProfile">
			<button v-if="!isFriend" class="OptionsProfile_sub"> add friend </button>
			<button class="OptionsProfile_sub">  message </button>
			<button class="OptionsProfile_sub">  suggest a match </button>
			<button class="OptionsProfile_sub">  see Profile Page </button>
		</div> 
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	username: {
		type: String,
	},
	isFriend : {
		type: Boolean,
	}
})

let user = ref( await getUserInfos(props.username));
let stat = ref( await getUserStats(props.username));
let avatar = ref( await getUserAvatar(props.username));

async function  getUserInfos(username: string) {
	if (username) {
		const { $apiFetch } = useNuxtApp();
		return await $apiFetch(`/users/${username}`)
			.then( async (userInfos) =>{
				console.log("user Infos")
				console.log(userInfos);
				return userInfos;
			})
			.catch((error) => {
				console.warn(error);
			});
		}
		return null;
	}

async function  getUserStats(username: string) {
	if (username) {
	const { $apiFetch } = useNuxtApp();
	return await $apiFetch(`/users/${username}/stats`)
		.then( async (userStats) =>{
			console.log("userStats");
			console.log(userStats);
			return userStats;
		})
		.catch((error) => {
			console.warn(error);
		});
	}
	return null;
}

async function  getUserAvatar(username: string) {
	if (username) {
		const { $apiFetch } = useNuxtApp();
		return await $apiFetch(`/users/${username}/avatar`)
			.then( async (userAvatar) =>{
				console.log("userAvatar");
				console.log(userAvatar);
				return userAvatar;
			})
			.catch((error) => {
				console.warn(error);
			});
		}
		return null;
}
</script>
