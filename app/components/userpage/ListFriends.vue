<script setup lang="ts">
	const friends = ref(await getUserFriends("lvirgini")); // TODO change for this user
</script>
	
	<template>
	<div>
		<div class="all" v-for="user in friends">
			<Suspense>
				<userpageListItem :username="user.username" :isFriend="true" :pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
