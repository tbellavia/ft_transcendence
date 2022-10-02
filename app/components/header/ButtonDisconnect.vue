<template>
<li class="dropleft" v-if="disconnectButton">
  <svgLogoParam />
  <ul>
    <li><button @click="disconnect"> DISCONNECT </button></li>
  </ul>
</li>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">

const disconnectButton = ref(false); // TODO mai-fliend eithan
try {
  const user = getUserAuthenticate();
  if (user.value)
    disconnectButton.value = true;
  } catch {  } // TODO mai-fliend eithan

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
      console.warn(error);
      await navigateTo("/");
    });
}
</script>

