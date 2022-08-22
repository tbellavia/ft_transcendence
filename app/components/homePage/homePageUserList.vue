<template>
	<div class=Profile v-for="user in getUser()">
		<div class="userImage"> {{ user.image_url }}</div>
		<div class="userDatas">
			<div class="userName"> {{ user.first_name }}</div>
			<div class="rank">{{ user.rank }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">

function getUser() {

return [{
	image_url: "image_url",
	first_name: "user1",
	rank: "rank",
}, {
	image_url: "image_url",
	first_name: "user2",
	rank: "rank",
},
{
	image_url: "image_url",
	first_name: "user3",
	rank: "rank",
}]
}

// function listProfiles() {
// 	let div = document.createElement("div");
// 	for (let user in users) {
// 		let div = document.createElement("div")
// 	}

// }



// let users = getAllUsers()



</script>

<style scoped>


</style>