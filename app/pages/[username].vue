<template>
  <NuxtLayout name="home">
    <NuxtPage  :key="route.fullPath" />
  </NuxtLayout>
</template>


<script setup lang="ts">
  const route = useRoute();
</script>