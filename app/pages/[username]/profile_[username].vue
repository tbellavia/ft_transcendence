<template>
<Suspense>
	<profilePublic :username="props.username"/>
	
</Suspense>	COUCOU
</template>

<script setup lang="ts">

const props = defineProps({
	username: {
		required: true,
		type: String,
	}
})

console.log(props.username);
</script>