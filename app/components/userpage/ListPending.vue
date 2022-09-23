<script setup lang="ts">
import { useUserAuthentified } from '~~/composables/useUserAuthentified';

	const userAuthentified = await useUserAuthentified();
</script>
	
	<template>
	<div>
    <div class="all" v-for="user in userAuthentified.pendingFriends">
			<Suspense v-if="userAuthentified.username !== user.username">
				<userpageListItem
					:username="user.username"
					:isFriend="false"
					:pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
