<script setup lang="ts">
	const userApi = await useUserApi();
	const users = await userApi.getAllUsers();
</script>
	
	<template>
	<div>
		<div class="all" v-for="user in users">
			<Suspense>
				<userpageListItem :username="user.username" :isFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
