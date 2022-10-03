<template>
<li class="dropleft">
  <svgLogoParam />
  <ul>
    <li><NuxtLink class="settings-button" :href="settingslink"> SETTINGS </NuxtLink></li>
    <li><button @click="disconnect"> DISCONNECT </button></li>
  </ul>
</li>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
const userAuth = await getRefreshedUserAuthenticate();
const settingslink = `/user/${userAuth.value.username}/settings`;
async function disconnect() {

  const socket = useSocket();
  socket.value.disconnect();

  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/disconnect")
    .then(async () => {
      const { $eventBus } = useNuxtApp();
      $eventBus.$emit('disconnect');
      await navigateTo("/")
    })
    .catch(async error => {
      await navigateTo("/");
    });
}
</script>

<style>
.settings-button {
  text-decoration: none;
  padding: 2px;
  padding-left: 10px;
  padding-right: 32px;
}
</style>