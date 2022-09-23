<template>
	<div class="Profile">
		<div class="ProfileImage"> IMAGE</div>
		<div class="ProfileData">
			<ul>
				<li>  USERNAME </li>
				<li> subscribe since DATE </li>
				<li> RANK </li>
				<!-- https://bootstrap-vue.org/docs/components/progress -->
				<li> Success: %NOMBRE </li>
				<li> Win: NOMBRE </li>
				<li> Loose: NOMBRE </li>
			</ul>
		</div>
	</div>
</template>



<style scoped>
	.Profile {
		width: 100%;
		height: 180px;
		border: solid;
		display: flex;
	}
	
	.ProfileImage {
		display: flex;
		width: 180px;
		height: 180px;
	}
	
	.ProfileData {
		display: flex;
		border: solid;
		width: 100%;
		height: 100%;
		align-self: center;
	}
	
	.ProfileData ul {
		width: 100%;
		padding-left: 5%;
	}
	
	</style>
	