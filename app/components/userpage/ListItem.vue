<template>
	<div v-if="props.username" class=Profile > 
		
		<!--  AVATAR and NAME -->
		<div class="userDatas">
			<div class="userImage"> <img :src="urlAvatar"/> </div>
			<div class="userName"> {{ props.username }}</div>
		</div> 

		<!-- Buttons of all options -->
		<div class="OptionsProfile">

			<!-- PENDING FRIENDS: accept or refuse friendship -->
			<div v-if="props.pendingFriend">
				<button class="OptionsProfile_sub" 
					@click="acceptFriend()"> accept friend
				</button>
				<button class="OptionsProfile_sub" 
					@click="deleteFriend()"> refuse friend
				</button>
			</div>

			<!-- ADD or REMOVE FRIENDSHIP -->
			<button v-else-if="props.isFriend === false" class="OptionsProfile_sub"
				@click="addFriend()"> add friend
			</button>
			<button v-else-if="props.isFriend === true" class="OptionsProfile_sub"
				@click="deleteFriend()"> remove friend
			</button>

			<!-- SEND MESSAGE -->
			<div class="OptionsProfile_sub">
				<a :href="messageLink">message</a>
			</div>

			<!-- SUGGEST MATCH -->
			<button class="OptionsProfile_sub">  suggest a match </button>

			<!-- SEE PROFILE PAGE -->
			<button class="OptionsProfile_sub">  see Profile Page </button>

			<!-- BLOCK or UNBLOCK USER -->
			<button v-if="isBlockedUser" class="OptionsProfile_sub"
				@click="unblock()"> unblock
			</button>
			<button v-else class="OptionsProfile_sub" 
				@click="block()"> block
			</button>
		</div> 
	</div>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">

const props = defineProps({
	username: {
		required: true,
		type: String,
	},
	isFriend: Boolean,
	isBlocked: Boolean,
	pendingFriend: Boolean,
})

const authUsername = (await useGetUser()).value.username;
const messageLink = `/${authUsername}/chat/${props.username}`;

const userApi = await useUserApi(props.username);
const emit = defineEmits(['refreshList']);

async function acceptFriend() {
	await userApi.acceptFriend(props.username)
	.then (() => {
		emit('refreshList')
	})
}

async function deleteFriend() {
	await userApi.deleteFriend(props.username)
	.then (() => {
		emit('refreshList')
	})
}

async function addFriend() {
	await userApi.addFriend(props.username)
	.then (() => {
		emit('refreshList')
	})
}

async function block() {
	await userApi.block(props.username)
	.then (() => {
		emit('refreshList')
		isBlockedUser.value = true;
	}).catch( (error) => console.warn(error))
}

async function unblock() {
	await userApi.unblock(props.username)
	.then (() => {
		emit('refreshList')
		isBlockedUser.value = false;
	}).catch( (error) => console.warn(error))
}


async function isBlocked() {
	return await userApi.isBlocked(props.username);
}

const isBlockedUser = ref(await isBlocked());
console.log("isBlocked: ", typeof(isBlockedUser.value));

async function displayAvatar() {
	let avatar = await getAvatar(props.username);
	return URL.createObjectURL(avatar);
}

const urlAvatar = ref(await displayAvatar());
</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
	button, a {
		width: 100%;
		text-align: left;
		padding-left: 15px;
	}
</style>
