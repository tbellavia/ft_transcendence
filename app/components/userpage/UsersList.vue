<script setup lang="ts">
let users = ref('friends');

const userAuthenticate = await useUserAuthentified();



</script>

<template>
<div class="userListComponent">
	<div class="friends-buttons">
		<button @click="users = 'friends'"> Friends </button>
		<button @click="users = 'all'"> All Users </button>
		<button @click="users = 'pending'"> Pending </button>
	</div>
	<div class="userLists">
		<Suspense v-if="users === 'friends'">
			<userpageListFriends :userAuthenticate="toRef(userAuthenticate)" class="all"/>
		</Suspense>
		<Suspense v-else-if="users === 'all'">
			<userpageListUsers :userAuthenticate="toRef(userAuthenticate)" class="all"/>
		</Suspense>
		<Suspense v-else>
			<userpageListPending :userAuthenticate="toRef(userAuthenticate)" class="all"/>
		</Suspense>
	</div>
</div>
</template>

<style scoped>

.userListComponent {
	display: block;
	width: 100%;
	height: 100%;
	padding-bottom: 5%;


}
.userLists {
	display: flex;
	width: 100%;
	height: 100%;
	padding: 5%;
	overflow: scroll;
}
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
