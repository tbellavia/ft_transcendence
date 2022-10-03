<template>
	<div class=Profile > 
		
		<!--  AVATAR and NAME -->
		<div class="userDatas">
			
			<div class="userImage"> <img :src="avatarUrl"/> </div>
			<div class="userName"> {{ props.name }}</div>
		</div> 

		<!-- Buttons of all options -->
		<div class="OptionsProfile">

			<!-- SEE PROFILE PAGE -->
			<button class="OptionsProfile_sub" @click='navigateTo("/user/" + props.name + "/profile" )'> Profile Page </button>

			<!-- Target is not auth user -->
			<div v-if="authUser.username != name">
				<!-- Can suggest a match if user is online and not in a match -->
				<button class="OptionsProfile_sub" v-if="canSuggestMatch" @click="suggestMatch">suggest a match</button>

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
import { f } from 'ohmyfetch/dist/error-d4c70d05';

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
const socketChat = useSocketChat();
const authUser = getUserAuthenticate();
const authUserIsModerator = ref(false);
let authUserIsOwner = ref(false);
socketChat.value.emit(
	'is_channel_owner',
	{
		name: props.channelName,
		username: authUser.value.username
	},
	(isChanOwner: boolean) => {
		authUserIsOwner.value = isChanOwner;
	});

socketChat.value.emit(
	'is_channel_moderator',
	{
		name: props.channelName,
		username: authUser.value.username
	},
	(isChanOwner: boolean) => {
		authUserIsModerator.value = isChanOwner;
	}
);

function setModerator() {
	socketChat.value.emit('add_channel_moderator', {name: props.channelName, username: props.name});
}
const isModerator = ref(props.isModerator);
socketChat.value.on(
  'receive_add_channel_moderator',
  ({username, channelName}) => {
		if (channelName == props.channelName) {
			if (username == props.name)
				isModerator.value = true;
			else if (authUser && authUser.value && authUser.value.username == username)
				authUserIsModerator.value = true;
		}
	}
);
socketChat.value.on(
  'receive_remove_channel_moderator',
  ({username, channelName}) => {
		if (channelName == props.channelName) {
			if (username == props.name)
				isModerator.value = false;
			else if (authUser && authUser.value && authUser.value.username == username)
				authUserIsModerator.value = false;
		}
	}
);

function unsetModerator() {
	socketChat.value.emit('remove_channel_moderator', {name: props.channelName, username: props.name});
}

function banUser() {
	socketChat.value.emit('ban_channel_user', {name: props.channelName, username: props.name});
}

function unbanUser() {
	socketChat.value.emit('unban_channel_user', {name: props.channelName, username: props.name});
}

let canSuggestMatch = ref(!authUser.value.isInGame);

function suggestMatch() {
	const socketGame = useSocketGame();
	socketGame.value.emit('suggest-match', props.name);
}

const targetIsOwner = ref(false);
const isMutedTarget = ref(false);
if (!props.isBan) {
	socketChat.value.emit(
		'is_muted_user',
		{
			name: props.channelName,
			username: props.name
		},
		(isMuted: boolean) => isMutedTarget.value = isMuted
	);

socketChat.value.emit(
	'is_channel_owner',
	{
		name: props.channelName,
		username: props.name
	},
	(isChanOwner: boolean) => {
		targetIsOwner.value = isChanOwner;
	}
)
}

socketChat.value.on(
	'receive_mute_channel_user',
	({channelName, username}) => {
		if (channelName == props.channelName && username == props.name)
			isMutedTarget.value = true;
	}
);

socketChat.value.on(
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