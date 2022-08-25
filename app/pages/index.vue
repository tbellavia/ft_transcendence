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

<style scoped>
.real-body {
  width: 100%;
  height: 100%;
}

main {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
}
</style>
