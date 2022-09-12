<script setup lang="ts">
	const friends = ref(await getPendingFriends("lvirgini")); // TODO change for this user
</script>
	
	<template>
	<div>
		
		<div class="all" v-for="user in friends">
			<Suspense>
				<userpageListItem :username="user.username" :isFriend="false" :pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
