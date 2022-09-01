

<script setup lang="ts">
function getUser() {
	return [{
		image_url: "image",
		first_name: "Lylian",
		rank: "rank",
	}, {
		image_url: "image",
		first_name: "Virginie",
		rank: "rank",
	},
	{
		image_url: "image",
		first_name: "Tony",
		rank: "rank",
	}]
};

async function getFriendsUsers() {
	// const { $apiFetch } = useNuxtApp();
	// const users = await $apiFetch("/users")
	// 	// .then( async (user) => await JSON.parse(user))
	// 	.catch((error) => console.warn(error));
	// console.log(users);
	// console.log(typeof(users[0]));
	// for (let user in users)
	// {
	// 	console.log(user.username);
	// }
	// return users;
}
</script>

<template>
	<div  v-for="user in getUser()">
		<div class=Profile> {{ user.username }}
			<div class="userImage"> image </div>
			<div class="userDatas">
				<div class="userName"> {{ user.username }}</div>
				<div class="rank"> rank </div>
			</div> 
			<!-- <div v-if="user.online"> </div>
			<div v-else> </div>
		</div> __-->
		<!-- <div class="OptionProfile">
			<div class="userImage"> {{ user.image_url }}</div>
			<button> add friend </button>
			<button>  message </button>
			<button>  suggest a match </button> -->
		</div> 
	</div>
</template>

<style scoped>
 
 .Profile {
	font-size: 12px;
	display: flex;
	align-content: flex-start;

	border: solid;
	border-width: 1px;
	border-color: var(--main-color-op-30);
	border-radius: 4%;
 }

 .Profile:hover {
	 border: solid;
	 border-color: currentColor;
	border-width: 1px;

	   background-color: var(--main-color-op-30);
  color: var(--main-color-light);
 }

 .Profile:hover OptionProfile {
	animation: displayOptionprofile 5s;
 }

 @keyframe displayOptionProfile {
	
 }

.userImage{
	display: flex;
	margin: 5%;
	border: solid;
	border-radius: 5%;
	height: 100%;
}

.userDatas {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.OptionProfile {
	position: relative;
	left: 100%;
	/* display: hidden; */
}
</style>