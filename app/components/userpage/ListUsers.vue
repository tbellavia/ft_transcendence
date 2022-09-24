<script setup lang="ts">
import { UserAuthentified } from '~~/classes/UserAuthentified.class';

	const userApi = await useUserApi();
	const users = ref(await userApi.getAllUsers());

	async function refreshList() {
		users.value = await userApi.getAllUsers();
		await props.userAuthenticate.value.fetchAll();
	}

const props = defineProps({
	userAuthenticate: ref(UserAuthentified),
})

</script>
	
	<template>
	<div>
		<div class="all" v-for="user in users">
			<Suspense v-if="user.username !== props.userAuthenticate.username">
				<userpageListItem
				@refreshList="refreshList()"
				:userAuthenticate="toRef(props.userAuthenticate)"
				:target="user"
				:isFriend="false"
				:pendingFriend="false" />
			</Suspense>
		</div>
	</div>
	</template>
