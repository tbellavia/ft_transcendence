<script setup lang="ts">
	const userApi = await useUserApi();
	const pendingFriends = ref(await userApi.getPendingFriends());
	console.log(pendingFriends.value)
</script>
	
	<template>
	<div>
    <div class="all" v-for="user in pendingFriends">
			<Suspense v-if="userApi.username !== user.user_1.username">
				<userpageListItem
					:username="user.user_1.username"
					:isFriend="false"
					:pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
