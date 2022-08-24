<template>
  <NuxtLayout>
    <main v-if="isAuthenticate() == true">
      <home-page />
    </main>
    <main v-else >
      <Authentication />
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
function isAuthenticate() {
  return true;
}
</script>

<!-- -------------------------------------------------------------- -->


