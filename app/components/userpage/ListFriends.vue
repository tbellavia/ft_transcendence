<script setup lang="ts">
	const userApi = await useUserApi();
	const friends = await userApi.getFriends();
</script>
	
	<template>
	<div>
		<div class="all" v-for="user in friends">
			<Suspense v-if="userApi.user !== user.username">
				<userpageListItem
				:currentUser="userApi"
				:username="user.user_2.username"
				:isFriend="true"
				:pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
