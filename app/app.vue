<style>
@import "~/assets/main.css";
@import "~/assets/theme.css";
@import "~/assets/imagesSVG.css";
@import "~/assets/navbar.css";
@import "~/assets/dropLeft.css";
@import "~/assets/buttonSlider.css";
@import "~/assets/ListUsers.css";
@import "~/assets/ListUsersChat.css";
</style>

<!-- -------------------------------------------------------------- -->

<template>
   <v-app>
         <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">

const { $eventBus } = useNuxtApp();

let layout = ref('default');
$eventBus.$on('connect', async () => {
   layout.value = 'home'
});
$eventBus.$on('disconnect', async () => {
   layout.value = 'default'
});

// async function changeLayout() {
//   const { $apiFetch } = useNuxtApp();
//   await $apiFetch("/auth/isConnected")
//     .then(async () => layout.name = 'home')
//     .catch(async () => layout.name = 'default');
// }

</script>