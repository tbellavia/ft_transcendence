<template>
  <div class="real-body">
    <NavBar />
    <slot />
    <Copyright style="top: 99%" />
  </div>
</template>

<script setup lang="ts">
/**
 * Check if user is connected using api endpoints
 * if connected redirect to page
 * @param page the page to redirect user
 */
async function redirectIfConnected(page: string) {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/isConnected").then(async () => await navigateTo(page));
}
</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
.real-body {
  width: 100%;
  height: 100%;
}
</style>
