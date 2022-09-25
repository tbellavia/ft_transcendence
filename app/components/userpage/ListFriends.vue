<script setup lang="ts">
import { list } from 'postcss';
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

let userAuthenticate = await getUserAuthenticate();
let listFriends = await userAuthenticate.value.getFriends();
console.log("LIST FRIEND user.friend: ", userAuthenticate.value.friends);
console.log("LIST FRIEND: user.fetchApi ", listFriends);

async function refreshList() {
	// userAuthenticate.value = await getRefreshedUserAuthenticate();
	listFriends = await userAuthenticate.getFriends();
}
</script>
	
<!-- -------------------------------------------------------------- -->

<template>
<div >
	<div class="all" v-for="friend in listFriends">
		<Suspense v-if="friend" >
			<userpageListItem 
			@refreshList="refreshList()"
			:target="friend"
			:isFriend="true"
			:pendingFriend="false" />
		</Suspense>
	</div>
</div>
</template>
