<template>
	<!-- <profilePublic :user=userAuthenticate/> -->
	<div v-if="user" class="profile-page">
		<!-- <profileSelfProfileHeader /> -->
		<div class="profile-page-header">
			<div class="profile-user-image">
				<img :src="user.avatar_url" />
			</div>
			<div class="profile-user-parameters">
				<div class="profile-name">
					<h1 class="profile-username"> {{ user.username }} </h1>
					<h2 v-show="isFriend" class="profile-status"> {{ status }}</h2>
				</div>
				<div class="user-parameters-sub"> TOTAL GAMES : {{ user.stats.game_total }} </div>
				<div class="user-parameters-sub"> GAMES WON : {{ user.stats.game_won }} </div>
				<div class="user-parameters-sub"> GAMES LOST : {{ user.stats.game_total - user.stats.game_won -
				user.stats.game_abandonned }} </div>
				<div v-if="props.isUserAuth" class="profile-update-datas">
					<div class="user-parameters-sub">
						<authenticationDoubleAuthentication />
					</div>
					<!-- Name and Avatar update -->
					<div class="profile-change-name-and-avatar">
						<form @submit.prevent="submitName" class="profile-change-name">
							<input @keypress="lettersAndNumbersOnly" v-model="newName" type="text" required
								placeholder="new username" maxlength="16" />
							<input type="submit" value="Change username" class="submit">
							<p v-show="nameError == true" class="error">Invalid username</p>
						</form>
						<label for="newAvatar">Choose a new profile picture:</label>
						<input type="file" name="newAvatar" id="newAvatar" @change="submitAvatar" accept="image/png">
						<p v-show="imageError == true" class="error">Image too large (max 90 KB)</p>
					</div>
				</div>
				<Suspense v-else>
					<profileFriendsOptions :username="user.username" class="profile-friends-options" />
				</Suspense>
			</div>
			<div class="profile-rank">
				<h2 class="profile-username"> rank: {{ user.stats.rank }}</h2>
			</div>
		</div>
		<div class="profile-match">
			<Suspense>
				<profileMatchHistory :user="user" />
			</Suspense>
		</div>
	</div>
	<div v-else class="undefined">
		<h1>User not found</h1>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	username: {
		type: String,
		required: true,
	},
	isUserAuth: {
		type: Boolean,
		required: true
	}
})

const user = await(useUser(props.username))
if (!user.value.stats) // TODO do it in back eithan
	user.value = undefined

const newName = ref();
const imageError = ref();
const nameError = ref();
const userAuthenticate = await getRefreshedUserAuthenticate();
const isFriend = ref(await userAuthenticate.value.isFriend(user.value.username));
const status = ref('offline');

if (isFriend.value) {
	const socket = useSocket();
	socket.value.emit('get_status', user.value.username, userStatus => status.value = userStatus);
}

const lettersAndNumbersOnly = (event: any) => {
	event = (event) ? event : window.event;
	var charCode = (event.which) ? event.which : event.keyCode;
	if ((charCode < 48 || charCode > 57)
		&& (charCode < 65 || charCode > 90)
		&& (charCode < 97 || charCode > 122)
		&& charCode !== 13 && charCode !== 95) {
		event.preventDefault();
	} else {
		return true;
	}
}

async function submitName() {
	nameError.value = await user.value.updateUsername(newName.value);
	newName.value = ""
	if (nameError.value == true) {
		return
	}
	await user.value.fetchAll() // TODO eithan see fix with virginie
	user.value = await getRefreshedUserAuthenticate()
	const route = useRoute()
	await redirectIfConnected(route.fullPath.replace(String(route?.params?.username), user.value.username), '/');
}

async function submitAvatar(event) {
	event.preventDefault();
	let file = event.target.files[0];
	document.getElementById('newAvatar').value = "";
	if (!file) {
		return
	}
	else if (file.size > 90000 || !file.name.endsWith(".png")) {
		imageError.value = true
		return
	}
	let data = new FormData();
	data.append('file', file, file.name)

	await user.value.updateAvatar(data)
	await user.value.fetchAll()
	imageError.value = false
}

</script>


<style scoped>
.profile-page {
	display: flex;
	flex-direction: column;
}

.profile-page-header {
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
}

div.profile-user-parameters {
	width: fit-content;
	padding-left: 5%;
}

div.user-parameters-sub {
	display: flex;
	width: 100%;
}

.profile-name {
	display: flex;
	width: 100%;
	justify-content: space-between;
}

.profile-status {
	scale: 0.8;
}

.profile-rank {
	margin-left: auto;
}

/* border: 3px solid green; */

.profile-update-datas {
	max-width: 300px;
	margin-top: 10px;
}

.profile-change-name {
	margin-top: 30px;
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
}

.profile-change-name .submit {
	width: 180px;
	/* align-self: center; */
}

.profile-friends-options {
	margin-top: 30px;
}

img {
	min-width: 100px;
}

.error {
	color: var(--error-color);
}

.undefined {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>