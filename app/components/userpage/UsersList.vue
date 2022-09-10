<script setup lang="ts">
// const loading = ref(true);


// const friends = ref(await getFriendsUsers());
// const allUser = ref(await getAllUsers());


// async function  getFriendsUsers() {
// 	const { $apiFetch } = useNuxtApp();
// 	return await $apiFetch("/users/lvirgini/friends")
// 		.then( async (user) =>{
// 			loading.value = false;
// 			return user;
// 		})
// 		.catch((error) => {
// 			console.warn(error);
// 			return null
// 		});
// }

// async function getAllUsers() {
// 	const { $apiFetch } = useNuxtApp();
// 	return await $apiFetch("/users")
// 		.then( async (user) =>{
// 			loading.value = false;
// 			return user;
// 		})
// 		.catch((error) => {
// 			console.warn(error);
// 			return null
// 		});
// }


// let displayUser = ref(false);
// let users = friends;
// function changeUserList(list: string) {
// 	if (list === 'Friends')
// 		users = ref(friends.value);
// 	else
// 		users = ref(allUser.value);
// 	loading.value = false;
// 	loading.value = true;
// 	console.log(users.value);
// }

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
