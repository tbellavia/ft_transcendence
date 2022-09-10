<script setup lang="ts">
	const users = ref(await getFriendsUsers());
	
	async function  getFriendsUsers() {
		const { $apiFetch } = useNuxtApp();
		return await $apiFetch("/users")
			.then( async (user) =>{
				console.log('allUsers');
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
		<div class="all" v-for="user in users">
			<Suspense>
				<userpageListItem :username="user.username" :isFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
