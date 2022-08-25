<template>
  <NuxtLayout>
    <main>
      <Authentication @connect="redirectIfConnected('/homePage')" />
      <a style="top: 70%" href="#" @click="disconnect">disconnect</a>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
// onMounted(async () => {
//   await redirectIfConnected("/homePage");
// });

/**
 * Check if user is connected using api endpoints
 * if connected redirect to page
 * @param page the page to redirect user
 */
async function redirectIfConnected(page: string) {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/isConnected").then(async () => await navigateTo(page));
}

async function disconnect() {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/disconnect");
}
</script>

<style scoped>
.real-body {
  width: 100%;
  height: 100%;
}

main {
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
  flex-direction: column;
}
</style>
