<template>
	<div class="profile-page">
		<div class="profile-header">
			<div class="profile-user-image"> <img :src="urlAvatar"/> </div>
			<div class="profile-user-image">

				<h2 class="profile-username"> {{ authUsername }}</h2>
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
				<profileMatchHistory />
			</Suspense>
		</div>

	</div>
</template>

<!-- -------------------------------------------------------------- -->
<!-- -------------------------------------------------------------- -->

<script setup lang="ts">

let props = ({
	username: "Lylian",
})

// authUsername = NULL;
const authUsername = (await useGetUser())?.value?.username;
const userApi = await useUserApi(props.username);

console.log(authUsername);
console.log(userApi);
console.log(await userApi.getInfo());

//-- -------------------------------------------------------------- -->

async function displayAvatar() {
	let avatar = await getAvatar(props.username);
	return URL.createObjectURL(avatar);
}

const urlAvatar = ref(await displayAvatar());
</script>