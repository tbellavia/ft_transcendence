<script setup lang="ts">
	const userApi = await useUserApi();
	const pendingFriends = ref(await userApi.getPendingFriends());
</script>
	
	<template>
	<div>
    <div class="all" v-for="user in pendingFriends">
			<Suspense v-if="userApi.username !== user.user_2.username">
				<userpageListItem
					:username="user.user_2.username"
					:isFriend="false"
					:pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
