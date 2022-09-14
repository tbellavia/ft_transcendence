<script setup lang="ts">
	const userApi = await useUserApi();
	const friends = await userApi.getFriends(); // TODO change for this user
</script>
	
	<template>
	<div>
		<div class="all" v-for="user in friends">
			<Suspense>
				<userpageListItem :username="user.user_2.username" :isFriend="true" :pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
