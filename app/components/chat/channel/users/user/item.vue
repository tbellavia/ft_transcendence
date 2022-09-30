<template>
	<div class=Profile > 
		
		<!--  AVATAR and NAME -->
		<div class="userDatas">
			
			<div class="userImage"> <img :src="avatarUrl"/> </div>
			<div class="userName"> {{ props.name }}</div>
		</div> 

		<!-- Buttons of all options -->
		<div class="OptionsProfile">

			<!-- SEND MESSAGE
			<div class="OptionsProfile_sub">
				<NuxtLink :href="messageLink">message </NuxtLink>
			</div> -->

			<!-- SUGGEST MATCH -->
			<button class="OptionsProfile_sub">suggest a match</button>

			<!-- SEE PROFILE PAGE -->
			<button class="OptionsProfile_sub">Profile Page</button>

			<div v-if="authUser.username != name">

				<!-- Owner can set other users in channel as moderator or not -->
				<div v-if="authUserIsOwner && !isBan">
					<button v-if="!isModerator" @click="setModerator" class="OptionsProfile_sub">Updgrade as moderator</button>
					<button v-else @click="unsetModerator" class="OptionsProfile_sub">Downgrade as simple user</button>
				</div>

				<!-- Can ban other user that is not owner -->
				<div v-if="authUserIsModerator && !targetIsOwner">
					<button v-if="!isBan" @click="banUser">Ban User</button>
					<button v-else @click="unbanUser">Unban User</button>

					<ChatChannelUsersUserMutePopup v-if="!isMutedTarget && !isBan" :name="name" :channel-name="channelName" />
				</div>
			</div>

		</div> 
	</div>
</template>
<!-- -------------------------------------------------------------- -->

<style scoped>
	button, a {
		width: 100%;
		text-align: left;
		padding-left: 15px;
	}
</style>


<script setup lang="ts">
const props = defineProps({
  name: {
    required: true,
    type: String
  },
	channelName: {
		required: true,
		type: String
	},
  isModerator: Boolean,
	isBan: Boolean
});

const avatarUrl = ref(await getAvatar(props.name));

const socket = useSocketChat();
const authUser = getUserAuthenticate();
const authUserIsModerator = ref(false);
let authUserIsOwner = ref(false);
socket.value.emit(
	'is_channel_owner',
	{
		name: props.channelName,
		username: authUser.value.username
	},
	(isChanOwner: boolean) => {
		authUserIsOwner.value = isChanOwner;
	});

socket.value.emit(
	'is_channel_moderator',
	{
		name: props.channelName,
		username: authUser.value.username
	},
	(isChanOwner: boolean) => {
		authUserIsModerator.value = isChanOwner;
	}
);

const targetIsOwner = ref(false);
socket.value.emit(
	'is_channel_owner',
	{
		name: props.channelName,
		username: props.name
	},
	(isChanOwner: boolean) => {
		targetIsOwner.value = isChanOwner;
	}
)

function setModerator() {
	socket.value.emit('add_channel_moderator', {name: props.channelName, username: props.name});
}
const isModerator = ref(props.isModerator);
socket.value.on(
  'receive_add_channel_moderator',
  ({username, channelName}) => {
    if (channelName == props.channelName && username == props.name)
			isModerator.value = true;
  }
);

socket.value.on(
  'receive_remove_channel_moderator',
  ({username, channelName}) => {
    if (channelName == props.channelName && username == props.name)
			isModerator.value = false;
  }
);

function unsetModerator() {
	socket.value.emit('remove_channel_moderator', {name: props.channelName, username: props.name});
}

function banUser() {
	socket.value.emit('ban_channel_user', {name: props.channelName, username: props.name});
}

function unbanUser() {
	socket.value.emit('unban_channel_user', {name: props.channelName, username: props.name});
}

const isMutedTarget = ref(false);
socket.value.emit(
	'is_muted_user',
	{
		name: props.channelName,
		username: props.name
	},
	(isMuted: boolean) => isMutedTarget.value = isMuted
);

socket.value.on(
	'receive_mute_channel_user',
	({channelName, username}) => {
		if (channelName == props.channelName && username == props.name)
			isMutedTarget.value = true;
	}
);

socket.value.on(
	'receive_unmute_channel_user',
	({channelName, username}) => {
		if (channelName == props.channelName && username == props.name)
			isMutedTarget.value = false;
	}
)

</script>

<style scoped>

.user-card {
  display: flex;
}

.user-content {
  display: flex;
  flex-direction: column;

  flex: 1;
}

.user-content > main {
  margin: 2em 0;
}

</style>