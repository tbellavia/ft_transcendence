<template>
	<!-- TODO if username != this user -->
	<div v-if="props.username" class=Profile > 
		<div class="userDatas">
			<!-- <div class="userImage"> <img src="data:avatar'.base64_encode($blob).'"/> </div> -->
			<!-- <div class="userImage"> <img :src="avatar"/> </div> -->
			<div class="userName"> {{ props.username }}</div>
		</div> 
		<div class="rank"> rank </div>
		<div class="OptionProfile">
			<button v-if="pendingFriend" class="OptionsProfile_sub" @click="setAcceptFriends('lvirgini', props.username)"> accept friend </button>
			<button v-else-if="!isFriend" class="OptionsProfile_sub" @click="setFriends('lvirgini', props.username)"> add friend </button>
			<button class="OptionsProfile_sub">  message </button>
			<button class="OptionsProfile_sub">  suggest a match </button>
			<button class="OptionsProfile_sub">  see Profile Page </button>
		</div> 
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	username: {
		type: String,
	},
	isFriend : {
		type: Boolean,
	},
	pendingFriend: {
		type: Boolean
	}
})

const userApi = await useUserApi(props.username);

let avatar = await userApi.getAvatar();

</script>
