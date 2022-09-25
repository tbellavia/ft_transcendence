<script setup lang="ts">
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

	const userApi = await useUserApi();
	const users = ref(await userApi.getAllUsers());
	let userAuthenticate = await getUserAuthenticate();

	async function refreshList() {
		users.value = await userApi.getAllUsers();
		userAuthenticate = await getRefreshedUserAuthenticate();
	}


</script>
	
	<template>
	<div>
		<div class="all" v-for="user in users">
			<Suspense v-if="user.username !== userAuthenticate.username">
				<userpageListItem
				@refreshList="refreshList()"
				:target="user"
				:isFriend="false"
				:pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
