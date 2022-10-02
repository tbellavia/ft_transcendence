<template>
	<profileSelfProfile v-if="disconnectButton" :username="user" :isUserAuth="isUserAuth"/>
	<div v-else class="undefined">
		<h1>User not found</h1>
	</div>
</template>

<script setup lang="ts">
const route = useRoute(); // TODO mai-fliend eithan
const disconnectButton = ref(false);
let isUserAuth = ref();
let user = ref();
try {
	const userPage = await(useUser(route.params.username))
	const userAuthenticate = ref(getUserAuthenticate());
	if (userAuthenticate?.value && userPage.value.stats) {
		disconnectButton.value = true;
		isUserAuth = ref(route.params.username === userAuthenticate.value.username ? true : false);
		user = String(route.params.username);
	}
} catch { } // TODO mai-fliend eithan
</script>

<style>
	.undefined {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
