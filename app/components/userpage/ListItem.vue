<template>
	<div v-if="props.username" class=Profile > 
		<div class="userDatas">
			<!-- <div class="userImage"> <img src="data:avatar'.base64_encode($blob).'"/> </div> -->
			<!-- <div class="userImage"> <img :src="avatar"/> </div> -->
			<div class="userName"> {{ props.username }}</div>
		</div> 
		<div class="rank"> rank </div>
		<div class="OptionProfile">
			<button v-if="pendingFriend" class="OptionsProfile_sub" 
				@click="setAcceptFriends(props.currentUser, props.username)"> accept friend
			</button>
			<button v-else-if="!isFriend" class="OptionsProfile_sub"
				@click="setFriends(props.currentUser, props.username)"> add friend
			</button>
			<div class="OptionsProfile_sub">
				<a :href="messageLink">message</a>
			</div>
			<button class="OptionsProfile_sub">  suggest a match </button>
			<button class="OptionsProfile_sub">  see Profile Page </button>
			<button v-if=isBlocked(props.username) class="OptionsProfile_sub"
				@click="setUnblock(props.username)"> unblock
		</button>
		<button v-else class="OptionsProfile_sub" 
				@click="setBlock(props.username)"> block
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
	currentUser: String,
})
let isblocked = ref(false);

const authUsername = (await useGetUser()).value.username;
const messageLink = `/${authUsername}/chat/${props.username}`;

const userApi = await useUserApi(props.username);
let avatar = await userApi.getAvatar();

</script>

<style scoped>
	button, a {
		text-align: left;
		padding-left: 15px;
	}
</style>
