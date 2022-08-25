<template>
  <div class="real-body">
    <header>
      <NavBar />
    </header>
    <main>
      <Authentication />
      <!-- <Testing_css /> -->
      <a style="top: 70%" href="#" @click="disconnect">disconnect</a>

      <!-- <Copyright /> -->
    </main>
  </div>
</template>

<script setup lang="ts">
onMounted(async () => {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/isConnected")
    .then(() => console.log("is connected"))
    .catch(() => console.log("is disconnected"));
});

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
