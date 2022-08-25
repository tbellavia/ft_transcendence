

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
}

// function listProfiles() {
// 	let div = document.createElement("div");
// 	for (let user in users) {
// 		let div = document.createElement("div")
// 	}

// }

// let users = getAllUsers()
</script>

<template>
	<div  v-for="user in getUser()">
		<div class=Profile>
			<div class="userImage"> {{ user.image_url }}</div>
			<div class="userDatas">
				<div class="userName"> {{ user.first_name }}</div>
				<div class="rank">{{ user.rank }}</div>
			</div>
			<div v-if="user.online"> </div>
			<div v-else> </div>
		</div>
		<div class="OptionProfile">
			<div class="userImage"> {{ user.image_url }}</div>
			<button> add friend </button>
			<button>  message </button>
			<button>  suggest a match </button>
		</div>
	</div>

	<div class=Profile2 v-for="user in getUser()">
		<div class="userImage"> {{ user.image_url }}</div>
		<div class="userDatas">
			<div class="userName"> {{ user.first_name }}</div>
			<div class="rank">{{ user.rank }}</div>
		</div>
	</div>
</template>

<style scoped>
 
 .Profile, .Profile2 {
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

 .Profile2:hover {
		 border: solid;
	 border-color: currentColor;
	border-width: 1px;

 background-color: var(--main-color);
  color: var(--background-color);

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