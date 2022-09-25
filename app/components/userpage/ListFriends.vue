<script setup lang="ts">
import { list } from 'postcss';
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

let userAuthenticate = await getUserAuthenticate();
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
