<template>
 MATCH ITEM
 <div class="match-user-image"> <img :src="avatar_url"/> </div>
		<div class="match-user-name" >	match</div>
		<div>{{ getMatchMessage() }}</div> 

</template>

<script setup lang="ts">

	const props = defineProps({
		match: Object,
		user: Object,
	})

	function getMatchMessage() {
		return "COUCOU";
	}

	const avatar_url = getAvatar(props.user.username);
	console.log(props.match);
</script>