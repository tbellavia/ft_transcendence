<template>
	<!-- TODO if username != this user -->
	<div v-if="props.username" class=Profile > 
		<div class="userDatas">
			<!-- <div class="userImage"> <img src="data:avatar'.base64_encode($blob).'"/> </div> -->
			<!-- <div class="userImage"> <img :src="avatar"/> </div> -->
			<div class="userName"> {{ user.username }}</div>
		</div> 
		<div class="rank"> rank </div>
		<div class="OptionProfile">
			<button v-if="pendingFriend" class="OptionsProfile_sub" @click="setAcceptFriends('lvirgini', user.username)"> accept friend </button>
			<button v-else-if="!isFriend" class="OptionsProfile_sub" @click="setFriends('lvirgini', user.username)"> add friend </button>
			<div class="OptionsProfile_sub">
				<a :href="messageLink">message</a>
			</div>
			<button class="OptionsProfile_sub">  suggest a match </button>
			<button class="OptionsProfile_sub">  see Profile Page </button>
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
	pendingFriend: Boolean
})

const authUsername = (await useGetUser()).value.username;
const messageLink = `/${authUsername}/chat/${props.username}`;

let user = ref( await getUserInfos(props.username));
let stat = ref( await getUserStats(props.username));
let avatar = ref( await getUserAvatar(props.username));

</script>
