<template>
    <main>
      <Authentication @connect="redirectIfConnected('/homePage')" />
    </main>
</template>

<script setup lang="ts">

/**
 * Check if user is connected using api endpoints
 * if connected redirect to page
 * @param page the page to redirect user
 */
async function redirectIfConnected(page: string) {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/isConnected").then(async () => await navigateTo(page))
  .catch(() => {});
}

</script>
