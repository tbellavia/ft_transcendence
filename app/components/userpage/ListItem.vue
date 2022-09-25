<template>
	<div v-if="props.target" class=Profile > 
		
		<!--  AVATAR and NAME -->
		<div class="userDatas">
			
			<div class="userImage"> <img :src="props.target.avatar_url"/> </div>
			<div class="userName"> {{ props.target.username }}</div>
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
			<button v-else-if="props.isFriend === false" class="OptionsProfile_sub"
				@click="useAction('addFriend')"> add friend
			</button>
			<button v-else-if="props.isFriend === true" class="OptionsProfile_sub"
				@click="useAction('removeFriend')"> remove friend
			</button>

			<!-- SEND MESSAGE -->
			<!-- <div class="OptionsProfile_sub">
				<a :href="messageLink">message</a>
			</div> -->

			<!-- SUGGEST MATCH -->
			<button class="OptionsProfile_sub">  suggest a match </button>

			<!-- SEE PROFILE PAGE -->
			<button class="OptionsProfile_sub"> Profile Page </button>

			<!-- BLOCK or UNBLOCK USER -->
			<button v-if="isBlocked()" class="OptionsProfile_sub"
				@click="useAction('block')"> unblock
			</button>
			<button v-else class="OptionsProfile_sub" 
				@click="useAction('block')"> block
			</button>
		</div> 
	</div>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
import { useUserAuthentified } from '~~/composables/useUserAuthentified';
import { UserAuthentified } from '~~/classes/UserAuthentified.class';
import { User } from '~~/classes/User.class';




const userAuthenticate = await getRefreshedUserAuthenticate();
const emit = defineEmits(['refreshList']);

const props = defineProps({
	target: User,
	isFriend: Boolean,
	isBlocked: Boolean,
	pendingFriend: Boolean,
})

async function isBlocked() {
	return await userAuthenticate.value.isBlockUser(props.target);
}

console.log("LISTITEN: ", props.target)
async function useAction(action: string)
{
	// let functionList = {
	// 	['acceptFriend']: async () => { await props.userAuthenticate.acceptFriend(props.target) },
	// 	['addFriend']: async () => { await props.userAuthenticate.addFriend(props.target) },
	// 	['removeFriend']: async () => { await props.userAuthenticate.removeFriend(props.target) },
	// 	['block']: async () => { await props.userAuthenticate.blockUser(props.target) },
	// 	['unblock']: async () => { await props.userAuthenticate.unblockUser(props.target) },
	// }

	if (action === 'acceptFriend') {
		console.log(action);
		await userAuthenticate.value.acceptFriend(props.target).then (async () => { emit('refreshList') });;
	}
	if (action === 'addFriend') {
		console.log(action);
		await userAuthenticate.value.addFriend(props.target).then  (async () => { emit('refreshList') });;
	}
	if (action === 'removeFriend') {
		console.log(action);
		await userAuthenticate.value.removeFriend(props.target).then  (async () => { emit('refreshList') });;
	}
	if (action === 'block') {
		console.log(action);
		await userAuthenticate.value.blockUser(props.target).then  (async () => { emit('refreshList') });;
	}
	if (action === 'unblock') {
		console.log(action);
		await userAuthenticate.value.unblockUser(props.target).then  (async () => { emit('refreshList') });;
	}

}


</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
	button, a {
		width: 100%;
		text-align: left;
		padding-left: 15px;
	}
</style>
