<script setup lang="ts">
let users = ref('friends');
</script>

<template>
<div class="all">
	<div class="friends-buttons">
		<button @click="users = 'friends'"> Friends </button>
		<button @click="users = 'all'"> All Users </button>
		<button @click="users = 'pending'"> Pending </button>
	</div>
	<Suspense v-if="users === 'friends'">
		<userpageListFriends />
	</Suspense>
	<Suspense v-else-if="users === 'all'">
		<userpageListUsers />
	</Suspense>
	<Suspense v-else>
		<userpageListPending />
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
