<template>
	<div v-if="props.username" class=Profile > 
		<div class="userDatas">
			<!-- <div class="userImage"> <img src="data:avatar'.base64_encode($blob).'"/> </div> -->
			<!-- <div class="userImage"> <img :src="avatar"/> </div> -->
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

const props = defineProps({
	username: {
		required: true,
		type: String,
	},
	isFriend: Boolean,
	pendingFriend: Boolean,
})
const authUsername = (await useGetUser()).value.username;
const messageLink = `/${authUsername}/chat/${props.username}`;

const userApi = await useUserApi(props.username);
let avatar = await userApi.getAvatar();

function acceptFriend() {
	userApi.acceptFriend(props.username);
}

function addFriend() {
	userApi.addFriend(props.username);
}

function block() {
	userApi.block(props.username);
}

function unblock() {
	userApi.unblock(props.username);
}

function isblocked() {
	let value = userApi.isBlocked(props.username);
	return value;
}


</script>

<style scoped>
	button, a {
		width: 100%;
		text-align: left;
		padding-left: 15px;
	}
</style>
