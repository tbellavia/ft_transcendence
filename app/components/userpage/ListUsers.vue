<script setup lang="ts">
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

	const userApi = await useUserApi();
	let users = ref(await getAllUsers());
	let userAuthenticate = await getUserAuthenticate();

	async function refreshList() {
		users = ref(await getAllUsers());
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
