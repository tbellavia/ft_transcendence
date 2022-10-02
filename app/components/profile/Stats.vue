<template>
    <!-- <div class="profile-stats"> -->
        <div class="profile-rank">
			<h2 class="profile-username"> rank: {{ user.stats.rank }}</h2>
		</div>
        <div class="user-parameters-sub"> TOTAL GAMES : {{ user.stats.game_total }} </div>
        <div class="user-parameters-sub"> GAMES WON : {{ user.stats.game_won }} </div>
        <div class="user-parameters-sub"> GAMES LOST : {{ user.stats.game_total - user.stats.game_won -
        user.stats.game_abandonned }} </div>
    <!-- </div> -->
</template>


<script setup lang="ts">
const props = defineProps({
    username: String
})

const user = await(useUser(props.username))

</script>

<style scoped>
.profile-rank {
	margin-left: auto;
}

div.user-parameters-sub {
	display: flex;
	width: 100%;
}
</style>