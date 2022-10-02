<template>
	<h2>MATCH HISTORY</h2>
	<div class="profile-match-body">
		<div class="list-match" v-for="match in props.user.matchs">
			<profileMatchItem :match="match" :user="props.user" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { User } from '~~/classes/User.class';


const props = defineProps ({
	user: User,
})

//-- -------------------------------------------------------------- -->

</script>


<style scoped>
.profile-match-component {
	width: 100%;
	border-width: 3px;
 	border-style: solid;
	border-image: linear-gradient( to bottom, var(--main-color), transparent) 1 100%;
	border-top: none;

}

.profile-match-body {
	height: 100%;
	overflow: hidden;
	overflow-y: scroll;
}

h2 {
	display: block;
	text-align: center;
	background: linear-gradient(to right, var(--main-color-op-30), transparent, var(--main-color-op-30));
	border-bottom: solid 1px;
	border-top: solid 1px;
}
</style>