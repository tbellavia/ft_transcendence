<script setup lang="ts">
	const userApi = await useUserApi();
	const users = await userApi.getAllUsers();
</script>
	
	<template>
	<div>
		<div class="all" v-for="user in users">
			<Suspense  v-if="userApi.user !== user.username">
				<userpageListItem 
				:username="user.username"
				:isFriend="false"
				:pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
