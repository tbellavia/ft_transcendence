<style>
@import "~/assets/main.css";
@import "~/assets/theme.css";
@import "~/assets/imagesSVG.css";
@import "~/assets/navbar.css";
@import "~/assets/dropLeft.css";
@import "~/assets/buttonSlider.css";
@import "~/assets/ListUsers.css";
@import "~/assets/ListUsersChat.css";
@import "~/assets/profilePage.css";
</style>

<!-- -------------------------------------------------------------- -->

<template>
   <v-app>
         <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">

// Try to load user in all app
try {
   await getRefreshedUserAuthenticate();
   await refreshUrl()
} catch {}

const { $eventBus } = useNuxtApp();

let layout = ref('default');
$eventBus.$on('connected', () => {
   layout.value = 'home'
});
$eventBus.$on('disconnect', () => {
   layout.value = 'default'
});


</script>