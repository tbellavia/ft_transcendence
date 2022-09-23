<script setup lang="ts">
import { useUserAuthentified } from '~~/composables/useUserAuthentified';
	const userAuthentified = await useUserAuthentified();
</script>
	
	<template>
	<div>
		<div class="all" v-for="user in userAuthentified.friends">
			<Suspense v-if="userAuthentified.username !== user.username">
				<userpageListItem
				:username="user.username"
				:isFriend="true"
				:pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
