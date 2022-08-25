<template>
  <main>
    <Authentication @connect="redirectIfConnected('/homePage')" />
    <a style="top: 70%" href="#" @click="disconnect">disconnect</a>
  </main>
</template>

<script setup lang="ts">
// onMounted(async () => {
//   await redirectIfConnected("/homePage");
// });
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
