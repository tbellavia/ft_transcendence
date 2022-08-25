<template>
<<<<<<< Updated upstream
  <NuxtLayout>
    <main>
      <Authentication />
=======
    <div>
      <Authentication @connect="redirectIfConnected('/homePage')" />
>>>>>>> Stashed changes
      <a style="top: 70%" href="#" @click="disconnect">disconnect</a>
    </div>
</template>

<script setup lang="ts">
onMounted(async () => {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/isConnected")
    .then(async () => await navigateTo("/homePage"))
    .catch(() => console.log("is disconnected"));
});

async function disconnect() {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/disconnect");
}
</script>

<style scoped>


</style>
