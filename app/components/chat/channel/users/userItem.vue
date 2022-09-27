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
			<button class="OptionsProfile_sub">  suggest a match </button>

			<!-- SEE PROFILE PAGE -->
			<button class="OptionsProfile_sub"> Profile Page </button>
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
  isModerator: Boolean
});

const user = await useUser(props.name);
await user.value.fetchAll();
const avatarUrl = user.value.avatar_url;

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