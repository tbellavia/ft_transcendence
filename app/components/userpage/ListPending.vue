<script setup lang="ts">
import { User } from '~~/classes/User.class';
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

let userAuthenticate = await getUserAuthenticate();
let pendingFriends = ref(await userAuthenticate.value.getFriendsRequest());

async function refreshList() {
	userAuthenticate.value = await getRefreshedUserAuthenticate();
	pendingFriends.value = await userAuthenticate.value.getFriendsRequest();
}

</script>
	
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
