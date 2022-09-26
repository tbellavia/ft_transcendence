<template>
	<Suspense>
		<!-- <profilePublic :user=userAuthenticate/> -->
	<div class="profile-page">
		<div class="profile-header">
			<div class="profile-user-image"> <img :src="userAuthenticate.avatar_url"/> </div>
			<div class="profile-user-params">

				<h1 class="profile-username"> {{ userAuthenticate.username }}</h1>
				<div class="user-parameters-sub"><authenticationDoubleAuthentication /></div>
				<div class="user-parameters-sub"><authenticationDoubleAuthentication /></div>
				<div class="user-parameters-sub"><authenticationDoubleAuthentication /></div>
				<div class="user-parameters-sub"><authenticationDoubleAuthentication /></div>
				<div class="user-parameters-sub"><authenticationDoubleAuthentication /></div>
			</div>
			<div>
				<!-- options add friends etc... -->
			</div>
			<div>
				<!-- stats -->
				<!-- rank -->
				<!--  -->
			</div>
		</div>
		<div class="profile-match">
			<Suspense>
				<profileMatchHistory :user="userAuthenticate"/>
			</Suspense>
		</div>

	</div>
	<!-- <div class="user_parameters">
	  <div class="user-parameters-sub"> </div>
	  <div class="user-parameters-sub"></div>
	  <div class="user-parameters-sub"></div>
	</div> -->
</Suspense>
	</template>
	
	<script setup lang="ts">
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

	const userAuthenticate: UserAuthentified = getUserAuthenticate();
	
	console.log("USER AUTH: ", userAuthenticate)
	</script>


	<style scoped>
	  div.user_parameters {
		width: 100%;
		display: flex;
		flex-direction: column;
	
	  }
	
	  div.user-parameters-sub {
		display: flex;
		width: 100%;
	  }
	</style>