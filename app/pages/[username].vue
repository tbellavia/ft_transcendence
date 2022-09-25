<template>
  <NuxtLayout name="home">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  await useUserAuthentified(); // TODO a initialiter lors de la connexion
</script>
