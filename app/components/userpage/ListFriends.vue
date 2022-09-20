<script setup lang="ts">
	const userApi = await useUserApi();
	const friends = ref(await userApi.getFriends());

function getFriendName(user: any) {
	if (user.user_1.username === userApi.user)
		return user.user_2.username
	return user.user_1.username
}

</script>
	
	<template>
	<div>
		<div class="all" v-for="user in friends">
			<Suspense >
				<userpageListItem
				:username="getFriendName(user)"
				:isFriend="true"
				:pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>



