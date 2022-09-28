<template>
		<!-- <profilePublic :user=userAuthenticate/> -->
		<div class="profile-page">
			<!-- <profileSelfProfileHeader /> -->
			<div class="profile-header">
				<div class="profile-user-image"> <img :src="user.avatar_url" /> </div>
				<div class="profile-user-params">
					<div class="profile-name-rank">
						<h1 class="profile-username"> {{ user.username }} </h1>
						<h2 class="profile-username"> rank: {{ user.stats.rank }}</h2>
						<v-spacer></v-spacer>
					</div>

					<div class="user-parameters-sub"> GAME total: {{ user.stats.game_total }} </div>
					<div class="user-parameters-sub"> GAME WON : {{ user.stats.game_won }} </div>
					<div class="user-parameters-sub"> GAME LOOSE: {{ user.stats.game_total - user.stats.game_won -
					user.stats.game_abandonned }} </div>
					<v-spacer></v-spacer>
					<div v-show="props.isUserAuth" class="profile-update-datas">
						<div class="user-parameters-sub">
							<authenticationDoubleAuthentication />
						</div>
						<div class="profile-change-name-and-avatar">
							<form @submit.prevent="submitName" class="profile-change-name">
								<input v-model="newName" type="text" required placeholder="new username" />
								<input type="submit" value="Change username" class="submit">
							</form>
							<label for="newAvatar">Choose a new profile picture:</label>
							<input type="file" name="newAvatar" id="newAvatar" @change="submitAvatar" accept="image/png">
							<p v-show="imageError == true">Image too large (max 90 KB)</p>
						</div>
					</div>
				</div>

			</div>
			<div class="profile-match">
				<Suspense>
					<profileMatchHistory :user="user" />
				</Suspense>
			</div>

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
let newName = ref();
let imageError = ref();
let nameError = ref();

async function submitName() {
	nameError = await user.value.updateUsername(newName.value);
	if (nameError == false) {
		await user.value.fetchAll()
		await refreshUrl();
	}
	newName.value = "";
}

async function submitAvatar(event) {
	event.preventDefault();
	let file = event.target.files[0];
	document.getElementById('newAvatar').value = "";
    if (!file)
	{
		return
	}
	else if (file.size > 90000)
	{
		imageError.value = true
		return
	}
	let data = new FormData();
	data.append('file', file, file.name)

	await user.value.updateAvatar(data)
	await user.value.fetchAll()
	await refreshUrl();
	imageError.value = false
}

</script>


<style scoped>
div.user_parameters {
	width: 100%;
	display: flex;
	flex-direction: column;
}

div.user-parameters-sub {
	display: flex;
	width: 100%;
}

.profile-name-rank {
	display: flex;
	width: 100%;
	justify-content: space-between;
}

.profile-update-datas {
	max-width: 300px;
	margin-top: 10px;
}

.profile-change-name {
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
}

.profile-change-name .submit {
	width: 180px;
	align-self: center;
}

</style>