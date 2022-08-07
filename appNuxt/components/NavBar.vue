<template>
<div class="navbar">
	<Studio_Logo />
	<ChangeTheme />


</div>

</template>

<script lang="ts">
import Studio_Logo from "./Svg/Studio_Logo.vue";
import ChangeTheme from "./ChangeTheme.vue";

export default {
    name: "NavBar",
    components: { Studio_Logo, ChangeTheme }
}


</script>