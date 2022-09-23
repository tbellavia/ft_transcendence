<template>
	<div>
		<div class="profile-header">
			<div class="profile-username"> {{ props.username }}</div>
			<!-- <div class="profile-user-image"> <img :src="urlAvatar"/> </div> -->
		</div>
		<div>
			<!-- options add friends etc... -->
		</div>
		<div>
			<!-- stats -->
			<!-- rank -->
			<!--  -->
		</div>
		<div>
			<!-- last match -->
		</div>

	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	username: String,
})


</script>