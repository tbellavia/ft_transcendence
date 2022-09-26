<template>
<Suspense>
	<profilePublic :username="props.username"/>
</Suspense>
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