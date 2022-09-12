<script setup lang="ts">
	const userApi = await useUserApi();
	const friends = await userApi.getPendingFriends();
</script>
	
	<template>
	<div>
    <div class="all" v-for="user in friends">
			<Suspense>
				<userpageListItem :username="user.user_2.username" :isFriend="false" :pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
