<script setup lang="ts">
	const userApi = await useUserApi();
	const pendingFriends = await userApi.getPendingFriends();
</script>
	
	<template>
	<div>
    <div class="all" v-for="user in pendingFriends">
			<Suspense v-if="userApi.username !== user.username">
				<userpageListItem
					:currentUser="userApi.user"
					:username="user.username"
					:isFriend="false"
					:pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
