<template>
  <h1>Data {{ jwt }}</h1>
  <div class="real-body">
    <header>
      <NavBar />
    </header>
    <main>
      <Authentication />
      <!-- <Testing_css /> -->
      <Copyright />
    </main>
  </div>
</template>

<script setup lang="ts">
import { stringifyQuery } from "vue-router";
const jwt = ref({});
console.log("Hello there");

const route = useRoute();
if (route.query.code) {
  const apiURL = `http://nestjs:3000/auth/api42?${stringifyQuery(route.query)}`;
  console.log(apiURL);
  const ret = await useFetch(apiURL);
  console.log(ret);
  console.log(ret.data);
  jwt.value = ret.data.value;
  console.log(jwt.value?.accessToken || "none");
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
  justify-content: flex-end;
  flex-direction: column;
}
</style>
