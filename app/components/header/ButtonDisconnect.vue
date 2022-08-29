<template>
<li class="dropleft">
  <svgLogoParam />
  <ul>
    <li>
      <button @click="disconnect"> DISCONNECT </button>
    </li>
  </ul>
</li>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
async function disconnect() {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/disconnect")
    .then(async () => await navigateTo("/"))
    .catch((error) => console.warn(error));
    
}
</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
</style>
