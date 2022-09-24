<script setup lang="ts">
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

async function refreshList() {
		await	props.userAuthenticate.fetchAll();
	}

const props = defineProps({
	userAuthenticate: ref(UserAuthentified),
})

</script>
	
	<template>
	<div>
    <div class="all" v-for="user in props.userAuthenticate.pendingFriend">
			<Suspense >
				<userpageListItem 
					@refreshList="refresList()"
					:target="user"
					:userAuthenticate="props.userAuthenticate"
					:isFriend="false"
					:pendingFriend="true" />
			</Suspense>
		</div>
	</div>
	</template>
