<script setup lang="ts">
import { UserAuthentified } from '~~/classes/UserAuthentified.class';


	async function refreshList() {
		await	props.userAuthenticate.fetchAll();
	}

const props = defineProps({
	userAuthenticate: ref(UserAuthentified),
})


</script>
	
<!-- -------------------------------------------------------------- -->

<template>
<div >
	<div class="all" v-for="user in props.userAuthenticate.friends">
		<Suspense v-if="user" >
			<userpageListItem 
			@refreshList="refreshList()"
			:userAuthenticate="props.userAuthenticate"
			:isFriend="true"
			:pendingFriend="false" />
		</Suspense>
	</div>
</div>
</template>
