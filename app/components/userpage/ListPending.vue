<script setup lang="ts">
	const userApi = await useUserApi();
	let pendingFriends = ref(await userApi.getPendingFriends());

	async function refreshList() {
		pendingFriends.value = await userApi.getPendingFriends();
	}
</script>
	
	<template>
	<div>
    <div class="all" v-for="user in pendingFriends">
			<Suspense v-if="userApi.username !== user.user_1.username">
				<userpageListItem 
					@refreshList="refreshList"
					:username="user.user_1.username"
					:isFriend="false"
					:pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
