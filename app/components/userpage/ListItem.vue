<template>
	<div v-if="props.target" class=Profile > 
		
		<!--  AVATAR and NAME -->
		<div class="userDatas">
			
			<div class="userImage"> <img :src="targetAvatar"/> </div>
			<div class="userNameAndStatus">
			<div class="userName"> {{ props.target.username }}</div>
				<p v-if="isFriend" class="userStatus">{{ status }}</p>
			</div>
		</div> 

		<!-- Buttons of all options -->
		<div class="OptionsProfile">

			<!-- PENDING FRIENDS: accept or refuse friendship -->
			<div v-if="props.pendingFriend">
				<button class="OptionsProfile_sub" 
					@click="useAction('acceptFriend')"> accept friend
				</button>
				<button class="OptionsProfile_sub" 
					@click="useAction('removeFriend')"> refuse friend
				</button>
			</div>

			<!-- ADD or REMOVE FRIENDSHIP -->
			<button v-show="!isBlocked" v-else-if="props.isFriend === false" class="OptionsProfile_sub"
				@click="useAction('addFriend')"> add friend
			</button>
			<button v-show="!isBlocked" v-else-if="props.isFriend === true" class="OptionsProfile_sub"
				@click="useAction('removeFriend')"> remove friend
			</button>

			<!-- SEND MESSAGE -->
			<div v-show="!isBlocked" class="OptionsProfile_sub">
				<NuxtLink :href="messageLink">message </NuxtLink>
			</div>

			<!-- SUGGEST MATCH -->
			<button v-if="!isBlocked && canSuggestMatch" class="OptionsProfile_sub" @click="useAction('suggest-match')">suggest a match</button>

			<!-- SEE PROFILE PAGE -->
			<button class="OptionsProfile_sub" @click='navigateTo("/user/" + props.target.username + "/profile" )'> Profile Page </button>

			<!-- BLOCK or UNBLOCK USER -->
			<button v-if="isBlocked" class="OptionsProfile_sub"
				@click="useAction('unblock')"> unblock
			</button>
			<button v-else class="OptionsProfile_sub" 
				@click="useAction('block')"> block
			</button>
		</div> 
	</div>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">

const props = defineProps({
	target: Object,
	isFriend: Boolean,
	isBlocked: Boolean,
	pendingFriend: Boolean,
})

const userAuthenticate = await getRefreshedUserAuthenticate();
const targetAvatar = ref(await getAvatar(props.target.username))
const isBlocked = ref(await userAuthenticate.value.isBlockUser(props.target));
const messageLink = `/user/${userAuthenticate.value.username}/chat/${props.target.username}`;
const emit = defineEmits(['refreshList']);


async function useAction(action: string) {
	if (action === 'acceptFriend')
		await userAuthenticate.value.acceptFriend(props.target);
	else if (action === 'addFriend')
		await userAuthenticate.value.addFriend(props.target);
	else if (action === 'removeFriend')
		await userAuthenticate.value.deleteFriend(props.target);
	else if (action === 'block') {
		await userAuthenticate.value.blockUser(props.target);
		isBlocked.value = await userAuthenticate.value.isBlockUser(props.target);
	}
	else if (action === 'unblock') {
		await userAuthenticate.value.unblockUser(props.target);
		isBlocked.value = await userAuthenticate.value.isBlockUser(props.target);
	}
	else if (action === 'suggest-match') {
		const socketGame = useSocketGame();
		socketGame.value.emit('suggest-match', props.target.username)
	}
	emit('refreshList');
}

const canSuggestMatch = ref(false);
let status = ref('offline');
if (props.isFriend) {
	const socket = useSocket();
	socket.value.emit('get_status', props.target.username, userStatus => {
		status.value = userStatus;
		if (status != 'offline' && status != 'in a game')
			canSuggestMatch.value = true;
		else
			canSuggestMatch.value = false;
});
}

</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
	button, a {
		width: 100%;
		text-align: left;
		padding-left: 15px;
	}

	.userNameAndStatus {
		margin-left: 1em;
		display: flex;
		flex-direction: column;
	}
</style>
