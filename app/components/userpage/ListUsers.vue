<script setup lang="ts">
let userAuthenticate = await getRefreshedUserAuthenticate();
let users = ref(await getAllUsers());

async function refreshList() {
	users.value = await getAllUsers();
	userAuthenticate = await getRefreshedUserAuthenticate();
}
</script>

<!-- -------------------------------------------------------------- -->
	
<template>
<div>
	<div v-if="users.length > 1" class="all" v-for="user in users">
		<Suspense v-if="user.username !== userAuthenticate.username">
			<userpageListItem
			@refreshList="refreshList()"
			:target="user"
			:isFriend="false"
			:pendingFriend="false" />
		</Suspense>
	</div>
	<div v-else>
		<h3 style="max-width: 250px;">No other user to list, you are the first one!</h3>
	</div>
</div>
</template>
