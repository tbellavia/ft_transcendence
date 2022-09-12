<script setup lang="ts">
	const users = ref(await getAllUsers());
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
