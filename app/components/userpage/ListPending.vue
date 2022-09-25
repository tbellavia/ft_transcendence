<script setup lang="ts">
let userAuthenticate = await getUserAuthenticate();
let pendingFriends = ref(await userAuthenticate.value.getFriendsRequest());

async function refreshList() {
	userAuthenticate = await getRefreshedUserAuthenticate();
	pendingFriends.value = await userAuthenticate.value.getFriendsRequest();
}
</script>

<!-- -------------------------------------------------------------- -->
	
<template>
<div>
<div class="all" v-for="pending in pendingFriends">
	<Suspense >
		<userpageListItem 
			@refreshList="refreshList()"
			:target="pending.user_1"
			:isFriend="false"
			:pendingFriend="true" />
	</Suspense>
</div>
</div>
</template>
