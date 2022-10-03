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
         <GameNotifyMatch />
         <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">

// Try to load user in all app
try {
   const route = useRoute();
   if (route.params.username)
      await refreshUrl();
} catch { }

const { $eventBus } = useNuxtApp();

let layout = ref('default');
$eventBus.$on('connected', () => {
   layout.value = 'home'
});
$eventBus.$on('disconnect', () => {
   layout.value = 'default'
});

const authUser = getUserAuthenticate();
const socketGame = useSocketGame();
socketGame.value.on('matched', ({id, username, left}) => {
   if (authUser && authUser.value) {
      authUser.value.isInGame = true;
      authUser.value.setMatch(id, username, left);
      navigateTo(`/user/${authUser.value.username}/game`);
   }
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