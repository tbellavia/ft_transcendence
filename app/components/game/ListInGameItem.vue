<template>
	<div class="match-item"  :id="background">
	   <div class="match-item-sub">
		   <div class="match-user-image"> <img :src="player_1.avatar_url"/> </div>
		   <div class="match-user-name" >	{{ player_1.username }} </div>
		</div>
		<div class="match-item-sub" >	VS </div>
	 	<div class="match-item-sub"> <div class="match-user-name" >	{{ player_2.username }} </div>
		<div class="match-user-image"> <img :src="player_2.avatar_url"/> </div>
		</div>
   </div>
   </template>
   
   <!-- -------------------------------------------------------------- -->
   
   <script setup lang="ts">
   import { User } from '~~/classes/User.class';
   
   const props = defineProps({
	   match: Object,
	   player_1: User,
	   player_2: User,
   })
    const player_1 = getUserAuthenticate();
	const player_2 = await useUser("amelie"); //TODO change and get player2

   const background = ref("won-match");
   
   </script>
   
   <!-- -------------------------------------------------------------- -->
   
   <style scoped>

	img {
		min-height: 40px;
		min-width: 40px;
	}
	.match-user-image {
	   width: 40px;
	   height: 40px;
	   display: flex;
   }
   
   .match-item {
	   display: flex;
   
	   justify-content:space-between;
	   align-content: center;

	   border: solid;
	   border-width: 1px;
	   border-color: var(--main-color-op-30);
	   background-color: var(--main-color-op-10);

   }
   
   .match-user-name {
	padding: 5px;
   }
   .match-item-sub {
	   width: 20%;
	   height: 40px;
	   display: flex;
	   justify-content: space-around;
   }
   
   </style>