<template>
	<profileSelfProfile v-if="disconnectButton" :username="username" :isUserAuth="isUserAuth"/>
	<div v-else class="undefined">
		<h1>User not found</h1>
	</div>
</template>

<script setup lang="ts">
const route = useRoute(); // TODO mai-fliend eithan
const disconnectButton = ref(false);
let isUserAuth = ref(false);
let username = ref('');
try {
	const user = await getRefreshedUserAuthenticate();
	if (user.value.username === route.params.username) {
		isUserAuth.value = true
		username.value = user.value.username
		disconnectButton.value = true;
	}
	else {
		isUserAuth.value = false;
		username.value = route.params.username as string;
		disconnectButton.value = true;
	}
} catch { username.value = route.params.username as string } // TODO mai-fliend eithan
</script>

<style>
	.undefined {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
