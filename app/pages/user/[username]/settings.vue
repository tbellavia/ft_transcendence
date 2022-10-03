<template>
	<div class="settings" v-if="user">
		<h1 class="anim-settings">SETTINGS</h1>
		<div class="profile-settings">

			<div class="set-avatar">
				<!-- Display Avatar -->
				<img class="settings-avatar" :src="user.avatar_url" />
				<!-- Avatar Form -->
				<label for="newAvatar" class="form-avatar">Choose a new profile picture:</label>
				<input type="file" name="newAvatar" id="newAvatar" @change="submitAvatar" accept="image/png">
				<p v-show="imageError == true" class="error">Image too large (max 90 KB)</p>
			</div>

			<div class="set-2fa-and-username">
				<!-- Double authentication component -->
				<div class="set-2fa">
					<authenticationDoubleAuthentication />
				</div>

				<div class="set-username">
					<!-- Display Username -->
					<h1 class="settings-username"> Username: {{ user.username }} </h1>
					<!-- Username Form -->
					<form @submit.prevent="submitName" class="form-username">
						<input @keypress="lettersAndNumbersOnly" v-model="newName" type="text" required
							placeholder="new username" maxlength="16" autofocus />
						<input type="submit" value="Change username" class="submit">
					</form>
					<p v-show="nameError == true" class="error">Invalid username</p>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
const newName = ref();
const imageError = ref();
const nameError = ref();
const user = getUserAuthenticate();

const lettersAndNumbersOnly = (event: any) => {
	event = (event) ? event : window.event;
	var charCode = (event.which) ? event.which : event.keyCode;
	if ((charCode < 48 || charCode > 57)
		&& (charCode < 65 || charCode > 90)
		&& (charCode < 97 || charCode > 122)
		&& charCode !== 13 && charCode !== 95
		&& charCode !== 45) {
		event.preventDefault();
	} else {
		return true;
	}
}

async function submitName() {
	nameError.value = await user.value.updateUsername(newName.value);
	if (nameError.value === true) {
		newName.value = ""
		return
	}
	// Reconnect all sockets if connected
	const sockets = [];
	sockets.push(useSocket().value);
	sockets.push(useSocketGame().value);
	sockets.push(useSocketChat().value);
	sockets.forEach(socket => {
		if (socket.connected) {
			socket.disconnect();
			socket.connect();
		}
	})

	// Redirect if name changed
	const route = useRoute()

	const path = `/user/${user.value.username}/settings`;
	await redirectIfConnected(path, '/');
	newName.value = ""
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
/* Main */
.settings {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: fit-content;
	border: solid;
}

.profile-settings {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}

/* Avatar */
.set-avatar {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 25px;
}

.settings-avatar {
	min-width: 200px;
	min-height: 200px;
	max-width: 300px;
	max-height: 300px;
}

.form-avatar {
	margin-top: 20px;
}

/* Username and 2FA */
.set-2fa-and-username {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 25px;
}

/* Only 2FA */
.set-2fa {
	margin: auto;
}

/* Only Username */
.set-username {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.form-username {
	margin-top: 10px;
	display: flex;
	flex-direction: row;
}

.form-username .submit {
	width: 180px;
}

.error {
	color: var(--error-color);
}
</style>