<script setup lang="ts">
	const userApi = await useUserApi();
	const pendingFriends = await userApi.getPendingFriends();
	console.log(pendingFriends);
</script>
	
	<template>
	<div>
    <div class="all" v-for="user in pendingFriends">
			<Suspense>
				<userpageListItem v-if="user.user_2.pending" :username="user.user_2.username" :isFriend="false" :pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
