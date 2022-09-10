<template>
	<div class=Profile >
				<div class="userImage"> image </div>
				<div class="userDatas">
					<div class="userName"> {{ user.username }}</div>
					<div class="rank"> rank </div>
				</div> 
				<div class="OptionProfile">
					<div class="userImage"> {{ user.image_url }}</div>
					<button> add friend </button>
					<button>  message </button>
					<button>  suggest a match </button>
				</div> 
			</div>
</template>

<script setup lang="ts">

const props = defineProps({
	username: {
		type: String,
	}
})

let user = getUserInfos(props.username)
let stat = getUserStats(props.username)

async function  getUserInfos(username: string) {
	const { $apiFetch } = useNuxtApp();
	return await $apiFetch(`/users/${username}`)
		.then( async (user) =>{
			console.log(user);
			return user;
		})
		.catch((error) => {
			console.warn(error);
			return null
		});
}

async function  getUserStats(username: string) {
	const { $apiFetch } = useNuxtApp();
	return await $apiFetch(`/users/${username}/stats`)
		.then( async (user) =>{
			console.log(user);
			return user;
		})
		.catch((error) => {
			console.warn(error);
			return null
		});
}
</script>
