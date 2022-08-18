<template>
  <div class="real-body">
    <header>
      <NavBar />
    </header>
    <main>
      <Authentication />
      <Copyright />
      <!-- <Testing_css /> -->
    </main>
  </div>
</template>

<script setup lang="ts"></script>

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
