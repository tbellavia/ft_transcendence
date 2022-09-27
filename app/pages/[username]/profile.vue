<template>
	<profileSelfProfile :username="user" :isUserAuth="isUserAuth" />
</template>

<script setup lang="ts">
	const userAuthenticate = getUserAuthenticate();
	const route = useRoute();
	const isUserAuth = ref(route.params.username === userAuthenticate.value.username ? true : false);
	const user = ref(String(route.params.username));
	console.log(isUserAuth)
</script>
