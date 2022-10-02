<!-- <template>
	<profilePublic :user=userAuthenticate/>
	<div v-if="user" class="profile-page">
		<profileSelfProfileHeader />
		<div class="profile-page-header">
			Display Avatar
			<div class="profile-user-image">
				<img :src="user.avatar_url" />
			</div>
			<div class="profile-user-parameters">
				<div class="profile-name">
					Display Username
					<h1 class="profile-username"> {{ user.username }} </h1>
					Display Status if is friend
					<h2 v-show="isFriend" class="profile-status"> {{ status }}</h2>
				</div>
				Display Rank and Stats
				<Suspense class="profile-stats">
					<profileStats :username="props.username" />
				</Suspense>
				Update Info
				<Suspense v-if="props.isUserAuth">
					<profileParams class="profile-update-datas" />
				</Suspense>
				Display options linked to friendship
				<Suspense v-else>
					<profileFriendsOptions :username="user.username" class="profile-friends-options" />
				</Suspense>
			</div>
		</div>
		Display Match History
		<div class="profile-match">
			<Suspense>
				<profileMatchHistory :user="user" />
			</Suspense>
		</div>
	</div>
	Display User Not Found
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

const user = await useUser(props.username)
if (!user?.value?.stats) // TODO do it in back eithan
	user.value = undefined

const isFriend = ref()
const userAuth = await getRefreshedUserAuthenticate()
if (props.isUserAuth === false)
	isFriend.value = user?.value ? ref(await userAuth.value.isFriend(user.value.username)) : false;

const status = ref('offline');

if (isFriend.value) {
	const socket = useSocket();
	console.log()
	socket.value.emit('get_status', user.value.username, userStatus => status.value = userStatus);
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

.profile-name {
	display: flex;
	width: 100%;
	justify-content: space-between;
}

.profile-status {
	scale: 0.8;
}

.profile-update-datas {
	max-width: 300px;
	margin-top: 10px;
}

.profile-friends-options {
	margin-top: 30px;
}

img {
	min-width: 200px;
	max-width: 300px;
}

.undefined {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style> -->

<template>
	<!-- Update Username Avatar and DoubleAuth -->
	<Suspense>
		<profileSettings />
	</Suspense>
</template>

<script setup lang="ts">
</script>