<template>
	<div v-if="user" class="profile-page">
		<div class="profile-page-header">
			<!-- Display Avatar -->
			<div class="profile-user-image">
				<img :src="user.avatar_url" />
			</div>
			<div class="profile-user-parameters">
				<!-- Display Username -->
				<div class="profile-name">
					<h1 class="profile-username"> {{ user.username }} </h1>
					<!-- Display Status if is friend or me -->
					<h2 v-if="isFriend" class="profile-status"> {{ status }} </h2>
					<h2 v-else class="profile-status">me</h2>
				</div>
				<!-- Display Rank and Stats -->
				<Suspense>
					<profileStats :username="props.username" />
				</Suspense>
				<!-- Display options linked to friendship -->
				<Suspense v-if="!props.isUserAuth">
					<profileFriendsOptions :username="user.username" class="profile-friends-options" />
				</Suspense>
			</div>
		</div>
		<!-- Display Match History -->
		<div class="profile-match">
			<Suspense>
				<profileMatchHistory :user="user" />
			</Suspense>
		</div>
	</div>
	<!-- Display User Not Found -->
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
// const userAuth = await getRefreshedUserAuthenticate()
const userAuth = getUserAuthenticate()
// const settingslink = `/user/${userAuth.value.username}/settings`;

const user = await useUser(props.username)
if (!user?.value?.stats) // TODO do it in back eithan
	user.value = undefined

const isFriend = ref()
if (props.isUserAuth === false)
	isFriend.value = user?.value ? ref(await userAuth.value.isFriend(user.value.username)) : false;

const status = ref('offline');

if (isFriend.value) {
	const socket = useSocket();
	socket.value.emit('get_status', user.value.username, userStatus => status.value = userStatus);
}

</script>

<style scoped>
.profile-page {
	display: flex;
	flex-direction: column;
}

.profile-page-header {
	border: solid;
	display: flex;
	margin-bottom: 10px;
}

div.profile-user-parameters {
	width: fit-content;
	padding-left: 5%;
}

.profile-name {
	display: flex;
}

.profile-status {
	scale: 0.8;
}

.profile-friends-options {
	margin-top: 30px;
	min-width: 200px;
	max-width: 300px;
}

.undefined {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>