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

// const emit = defineEmits(["disconnect"]);

// async function disconnect() {
//   const { $apiFetch } = useNuxtApp();
//   await $apiFetch("/auth/disconnect").then(() => emit("disconnect"));
// }

async function disconnect() {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/disconnect")
    .then(async () => {
      const { $eventBus } = useNuxtApp();
      $eventBus.$emit('disconnect');
      await navigateTo("/")
    })
    .catch((error) => {
      console.warn(error);
      navigateTo("/");
    })
    //TODO navigateTo / 
}
</script>

