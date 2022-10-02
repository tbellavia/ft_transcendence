<template>
	<profileSelfProfile v-if="disconnectButton" :username="user" :isUserAuth="isUserAuth"/>
	<div v-else class="undefined">
		<h1>User not found</h1>
	</div>
</template>

<script setup lang="ts">
const route = useRoute(); // TODO mai-fliend eithan
const disconnectButton = ref(false);
let isUserAuth = ref(false);
let user = ref('');
try {
	user = await getRefreshedUserAuthenticate();
	if (user.value.username === route.params.username) {
		isUserAuth.value = true
		user = user.value.username
		disconnectButton.value = true;
	}
	else {
		isUserAuth.value = false;
		user = route.params.username;
		disconnectButton.value = true;
	}
} catch { user = route.params.username } // TODO mai-fliend eithan
</script>

<style>
	.undefined {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
