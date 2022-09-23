<template>
	<div v-if="props.username" class=Profile > 
		<div class="userDatas">
			
			<div class="userImage"> <img :src="targetedUser.avatar_url"/> </div>
			<div class="userName"> {{ props.username }}</div>
			<div class="rank"> rank </div>
		</div> 
		<div class="OptionProfile">
			<button v-if="props.pendingFriend" class="OptionsProfile_sub" 
				@click="acceptFriend()"> accept friend
			</button>
			<button v-else-if="props.isFriend === false" class="OptionsProfile_sub"
				@click="addFriend()"> add friend
			</button>
			 	<div class="OptionsProfile_sub">
				<a :href="messageLink">message</a>
			</div>
			<button class="OptionsProfile_sub">  suggest a match </button>
			<button class="OptionsProfile_sub">  see Profile Page </button>
			<button v-if="isblocked() === true" class="OptionsProfile_sub"
				@click="unblock()"> unblock
			</button>
			<button v-else class="OptionsProfile_sub" 
				@click="block()"> block
			</button>
		</div> 
	</div>
</template>

<script setup lang="ts">
import { useUserAuthentified } from '~~/composables/useUserAuthentified';


const props = defineProps({
	username: {
		required: true,
		type: String,
	},
	isFriend: Boolean,
	pendingFriend: Boolean,
})

const userAuthentified = await useUserAuthentified();
const targetedUser = await useUser(props.username);

const messageLink = `/${userAuthentified.value.username}/chat/${targetedUser.value.username}`;

function acceptFriend() {
	userAuthentified.value.acceptFriend(targetedUser.value);
}

function addFriend() {
	userAuthentified.value.addFriend(targetedUser.value);
}

function block() {
	userAuthentified.value.blockUser(targetedUser.value);
}

function unblock() {
	userAuthentified.value.unblockUser(targetedUser.value);
}

function isblocked() {
	return userAuthentified.value.isBlocked(targetedUser.value);
}

</script>

<style scoped>
	button, a {
		width: 100%;
		text-align: left;
		padding-left: 15px;
	}
</style>
