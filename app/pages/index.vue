<template>
  <div class="real-body">
    <header>
      <NavBar />
    </header>
    <main v-if="isAuthenticate() == true">
      <home-page />
    </main>
    <main v-else >
      <Authentication />
      <Copyright />
    </main>
  </div>
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

</style>

