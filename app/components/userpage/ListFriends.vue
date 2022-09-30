<script setup lang="ts">
let userAuthenticate = await getRefreshedUserAuthenticate();
let listFriends = ref(await userAuthenticate.value.getFriends());

async function refreshList() {
	userAuthenticate = await getRefreshedUserAuthenticate();
	listFriends.value = await userAuthenticate.value.getFriends();
}
</script>
	
<!-- -------------------------------------------------------------- -->

<template>
<div >
	<div class="all" v-for="friend in listFriends">
		<Suspense v-if="friend" >
			<userpageListItem 
			@refreshList="refreshList()"
			:target="userAuthenticate.extractFriend(friend)"
			:isFriend="true"
			:pendingFriend="false" />
		</Suspense>
	</div>
</div>
</template>
