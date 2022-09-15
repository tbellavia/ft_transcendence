<script setup lang="ts">
	const userApi = await useUserApi();
	const users = ref(await userApi.getAllUsers());
</script>
	
	<template>
	<div>
		<div class="all" v-for="user in users">
			<Suspense >
				<userpageListItem v-if="userApi.user !== user.username"
				:username="user.username"
				:isFriend="false"
				:pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
