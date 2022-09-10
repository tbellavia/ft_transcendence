<script setup lang="ts">
let friends = ref(true);
</script>

<template>
<div class="all">
	<div class="friends-buttons">
		<button @click="friends = true"> Friends </button>
		<button @click="friends = false"> All Users </button>
	</div>
	<Suspense v-if="friends">
		<userpageListFriends />
	</Suspense>
	<Suspense v-else>
		<userpageListUsers />
	</Suspense>
</div>
</template>

<style scoped>

.friends-buttons {
	display: flex;
	align-items: center;
}
.friends-buttons button {
		width: 150px;
		height: 50px;
		display: block;
		text-align: center;
	}
.friends-buttons button:active {
border: solid;
}
</style>
