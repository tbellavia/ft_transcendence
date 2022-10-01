<template>
 <div class="match-item" :id="background">
	<div class="left-elem">
		<div class="match-user-image"> <img :src="target.avatar_url"/> </div>
		<v-spacer></v-spacer>
		<div class="match-user-name" >	{{ target.username }} </div>
		<v-spacer></v-spacer>
	</div>
	<div class="match-item-sub">{{ getMatchMessage() }} </div> 
	<div class="right-elem">{{ props.match.creation_date }} </div> 
</div>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
import { User } from '~~/classes/User.class';


const props = defineProps({
	match: Object,
	user: User,
})

const background = ref();
const target = await useUser(getTargetUser());

function winnerMessage(yourPoint: Number, targetPoint: Number) {
	background.value = "won-match";
	return `You WON: ${yourPoint} / ${targetPoint}`
}

function looserMessage(yourPoint: Number, targetPoint: Number) {
	background.value = "loose-match";
	return `You LOOSE: ${yourPoint} / ${targetPoint}`
}

function equalityMessage(yourPoint:Number, targetPoint: Number){
	background.value = "equality-match";
	return `EQUALITY:  ${yourPoint} / ${targetPoint}`

}
function formateMatchMessage(yourPoint: Number, targetPoint: Number){
	if (yourPoint > targetPoint)
		return winnerMessage(yourPoint , targetPoint);
	else if (yourPoint === targetPoint)
		return equalityMessage(yourPoint, targetPoint);
	else
		return looserMessage(yourPoint, targetPoint);
}

function getTargetUser() {
	if (props.match.user_1.username === props.user.username)
		return props.match.user_2.username;
	return props.match.user_1.username;
}

function getMatchMessage() {
	if (props.match.user_1.username === props.user.username) {
		return formateMatchMessage(props.match.player_1_point, props.match.player_2_point );
	}
	return formateMatchMessage(props.match.player_2_point, props.match.player_1_point);
}

</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
	.match-user-image {
	width: 40px;
	height: 40px;
	display: flex;
}

.match-item {
	display: flex;

	justify-content: space-between;
	align-content: center;
	align-items: center;


	border: solid;
	border-width: 1px;
	border-color: var(--main-color-op-30);
	background-color: var(--main-color-op-10);
}


.match-item-sub {
	display: flex;
	align-items: center;
}

.match-user-name {
	padding-left: 2vw;
}

.left-elem {
	display: flex;
	align-items: center;
	justify-self: flex-start;
}

.right-elem {
	justify-self: flex-end;
}

#won-match {
	background-color: var(--main-color-op-10);
}

#loose-match {
	background-color:var(--background-error-color);
	border-color: var(--background-error-color);
}

#equality-match {
	background-color: transparent;
}
</style>