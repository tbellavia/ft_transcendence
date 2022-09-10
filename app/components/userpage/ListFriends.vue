<script setup lang="ts">
	const loading = ref(true);
	
	const friends = ref(await getFriendsUsers());
	
	async function  getFriendsUsers() {
		const { $apiFetch } = useNuxtApp();
		return await $apiFetch("/users/lvirgini/friends")
			.then( async (user) =>{
				loading.value = false;
				console.log('friends');
				console.log(user);
				return user;
			})
			.catch((error) => {
				console.warn(error);
				return null
			});
	}
	</script>
	
	<template>
	<div class="all">
		<div v-if="loading === false" class="all" v-for="user in friends">
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
				<!-- <div v-if="user.online"> </div>
				<div v-else> </div>
			</div> __-->
			</div>
		</div>
	</div>
	</template>
