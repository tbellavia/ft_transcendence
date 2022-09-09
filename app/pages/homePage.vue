<template>
  <NuxtPage />
	<!-- <nuxtLayout name="home">
      <div v-html="svg.outerHTML"></div>
  </nuxtLayout> -->
</template>

<script setup lang="ts">

</script>

<style>
.home-page {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: space-around;
  top: 1%;
}

.all-users {
  display: flex;
}

.self-profile {
  display: flex;
}

.chat {
  width: 28%;
  border: solid;
  border-color: red;
}
</style>
