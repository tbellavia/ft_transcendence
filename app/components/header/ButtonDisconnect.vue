<template>
<li class="dropleft">
  <svgLogoParam />
  <ul>
    <li><button @click="disconnect"> DISCONNECT </button></li>
  </ul>
</li>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
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

