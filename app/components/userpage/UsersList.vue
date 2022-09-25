<script setup lang="ts">
let users = ref('friends');

let userAuthenticate = await getRefreshedUserAuthenticate();
console.log("USERLIST: ", userAuthenticate.value);


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
			<userpageListFriends class="all"/>
		</Suspense>
		<Suspense v-else-if="users === 'all'">
			<userpageListUsers class="all"/>
		</Suspense>
		<Suspense v-else>
			<userpageListPending class="all"/>
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
