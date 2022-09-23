<template>
	<Suspense>
	<profilePublic :username="Lylian" />
	<!-- <div class="user_parameters">
	  <div class="user-parameters-sub"><authenticationDoubleAuthentication /></div>
	  <div class="user-parameters-sub"> </div>
	  <div class="user-parameters-sub"></div>
	  <div class="user-parameters-sub"></div>
	</div> -->
</Suspense>
	</template>
	
	<script setup lang="ts">

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