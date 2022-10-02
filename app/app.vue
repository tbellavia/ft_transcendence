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
try { // TODO mai-fliend eithan
   const route = useRoute();
   if (route.params.username) {
      const user = getUserAuthenticate()
      await refreshUrl();
   }
   else {
      const user = await getRefreshedUserAuthenticate()
      if (user.value)
      await refreshUrl();
   }
} catch { } // TODO mai-fliend eithan

const { $eventBus } = useNuxtApp();

let layout = ref('default');
$eventBus.$on('connected', () => {
   layout.value = 'home'
});
$eventBus.$on('disconnect', () => {
   layout.value = 'default'
});


</script>

<style>
   html {
      overflow: scroll;
      overflow-x: hidden;
   }
   ::-webkit-scrollbar {
      width: 0;
      background: transparent;
   }
</style>