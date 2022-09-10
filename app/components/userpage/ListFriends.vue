<script setup lang="ts">
	const friends = ref(await getFriendsUsers());
	
	async function  getFriendsUsers() {
		const { $apiFetch } = useNuxtApp();
		return await $apiFetch("/users/lvirgini/friends") // TODO this User
			.then( async (user) =>{
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
	<div>
		<div class="all" v-for="user in friends">
			<Suspense>
				<userpageListItem :username="user.username" :isFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
