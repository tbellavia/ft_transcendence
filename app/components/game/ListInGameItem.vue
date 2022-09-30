<template>
	<div class="match-item" :id="background">
	   <div class="match-item-sub">
		   <div class="match-user-image"> <img :src="player_1.avatar_url"/> </div>
		   <v-spacer></v-spacer>
		   <div class="match-user-name" >	{{ player_1.username }} </div>
		   <v-spacer></v-spacer>
		</div>
		<div class="match-item-sub" >	{{ player_1_point }} / {{ player_2_point }} </div>
	   <v-spacer></v-spacer>
	   <div class="match-item-sub">
		   <v-spacer></v-spacer>
		   <div class="match-user-name" >	{{ player_2.username }} </div>
		   <v-spacer></v-spacer>
		   <div class="match-user-image"> <img :src="player_2.avatar_url"/> </div>
		</div>
   </div>
   </template>
   
   <!-- -------------------------------------------------------------- -->
   
   <script setup lang="ts">
   import { WinstonReporter } from 'consola';
   import { User } from '~~/classes/User.class';
   
   
   const props = defineProps({
	   match: Object,
	   player_1: User,
	   player_2: User,
   })
   
   const background = ref("won-match");
   
   </script>
   
   <!-- -------------------------------------------------------------- -->
   
   <style scoped>
	   .match-user-image {
	   width: 40px;
	   height: 40px;
	   display: flex;
   }
   
   .match-item {
	   width: 100%;
	   display: flex;
   
	   justify-content:flex-start;
	   align-content: center;
   
   
	   border: solid;
	   border-width: 1px;
	   border-color: var(--main-color-op-30);
	   background-color: var(--main-color-op-10);
   }
   
   
   .match-item-sub {
	   width: 20%;
	   height: 40px;
	   display: flex;
	   justify-content: space-around;
   }
   
   </style>