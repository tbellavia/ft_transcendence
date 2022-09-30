<template>
	<div class="profile-page">
		<div class="profile-header">
			<!-- <div class="profile-user-image"> <img :src="urlAvatar"/> </div>
			<div class="profile-user-image">

				<h2 class="profile-username"> {{ authUsername }}</h2>
			</div> -->
			<div>
				<!-- options add friends etc... -->
			</div>
			<div>
				<!-- stats -->
				<!-- rank -->
				<!--  -->
			</div>
		</div>
		<!-- <div class="profile-match">
			<Suspense>
				<profileMatchHistory :target="props.user"/>
			</Suspense>
		</div> -->

	</div>
</template>

<!-- -------------------------------------------------------------- -->
<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
import { User } from '~~/classes/User.class';
import { UserAuthentified } from '~~/classes/UserAuthentified.class';


const props = defineProps({
	user: Object,
})


//-- -------------------------------------------------------------- -->


</script>