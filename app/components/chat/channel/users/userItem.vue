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

			<div v-if="authUserIsOwner">
				<button v-if="!isModerator" @click="setModerator" class="OptionsProfile_sub">Updgrade as moderator</button>
				<button v-else @click="unsetModerator" class="OptionsProfile_sub">Downgrade as simple user</button>
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
  isModerator: Boolean
});

const avatarUrl = ref(await getAvatar(props.name));

const socket = useSocketChat();
let authUserIsOwner = ref(false);
socket.value.emit('is_channel_owner', props.channelName, (isChanOwner: boolean) => {
	authUserIsOwner.value = isChanOwner;
})
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
)

function unsetModerator() {

}

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