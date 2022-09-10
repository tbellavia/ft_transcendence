<script setup lang="ts">
	const loading = ref(true);
	
	const users = ref(await getFriendsUsers());
	
	async function  getFriendsUsers() {
		const { $apiFetch } = useNuxtApp();
		return await $apiFetch("/users")
			.then( async (user) =>{
				loading.value = false;
				console.log('allUsers');
				console.log(user);
				return user;
			})
			.catch((error) => {
				console.warn(error);
				return null
			});
	}

	async function  getThisUser(username: string) {
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
	</script>
	
	<template>
	<div>
		<div v-if="loading === false" class="all" v-for="user in users">
			<Suspense>
				<userpageListItem :username="user.username" />
			</Suspense>
		</div>
	</div>
	</template>
