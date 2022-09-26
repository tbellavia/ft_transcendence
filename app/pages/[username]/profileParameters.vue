<template>
		<profileSelfProfile :username="userAuthenticate.username" :isUserAuth="true" />
</template>

<script setup lang="ts">
	const userAuthenticate = getUserAuthenticate();

</script>
