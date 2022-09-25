<script setup lang="ts">
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

let userAuthenticate = await getUserAuthenticate();
let pendingFriends = await userAuthenticate.value.getFriends(true);

async function refreshList() {
	userAuthenticate = await getRefreshedUserAuthenticate();
	pendingFriends = await userAuthenticate.value.getFriends(true);
}

</script>
	
<template>
<div>
<div class="all" v-for="pending in pendingFriends">
	<Suspense >
		<userpageListItem 
			@refreshList="refreshList()"
			:target="userAuthenticate.extractFriend(pending)"
			:isFriend="false"
			:pendingFriend="true" />
	</Suspense>
</div>
</div>
</template>
