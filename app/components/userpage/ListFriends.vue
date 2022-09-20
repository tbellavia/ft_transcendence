<script setup lang="ts">
	const userApi = await useUserApi();
	let friends = ref(await userApi.getFriends());

	async function refreshList() {
		friends.value = await userApi.getFriends();
	}

	function getFriendName(user: any) {
		if (user) {
			if (user.user_1.username === userApi.user)
				return user.user_2.username
			return user.user_1.username
		}
		return undefined;
	}

	
</script>
	
<!-- -------------------------------------------------------------- -->

<template>
<div >
	<div class="all" v-for="user in friends">
		<Suspense v-if="user" >
			<userpageListItem 
			@refreshList="refreshList"
			:username="getFriendName(user)"
			:isFriend="true"
			:pendingFriend="false" />
		</Suspense>
	</div>
</div>
</template>
