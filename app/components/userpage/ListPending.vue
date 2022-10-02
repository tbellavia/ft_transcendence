<script setup lang="ts">
let userAuthenticate = await getRefreshedUserAuthenticate();
let pendingFriends = ref(await userAuthenticate.value.getFriendsRequest());

async function refreshList() {
	userAuthenticate = await getRefreshedUserAuthenticate();
	pendingFriends.value = await userAuthenticate.value.getFriendsRequest();
}
</script>

<!-- -------------------------------------------------------------- -->
	
<template>
<div>
<div v-if="pendingFriends.length" class="all" v-for="pending in pendingFriends">
	<Suspense >
		<userpageListItem 
			@refreshList="refreshList()"
			:target="pending.user_1"
			:isFriend="false"
			:pendingFriend="true" />
	</Suspense>
</div>
<div v-else>
	<h3 style="max-width: 250px;">No friend request pending at the moment</h3>
</div>
</div>
</template>
