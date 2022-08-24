<!-- Please remove this file from your project -->
<template>
  <div class="authentication-link">
    <p class="authentication-item">Click for login with 42</p>
    <a
      class="authentication-item"
      href="https://api.intra.42.fr/oauth/authorize?client_id=4cdd93e38d50fce3af5d817a430542b75506fbacf0b777ba6dc3a2312730d18d&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_type=code
"
      ><SVGBoy style="width: 100%"
    /></a>
  </div>
</template>

<script setup lang="ts">
import { stringifyQuery } from "vue-router";
//On mounted hook not called during SSR (only in client)
onMounted(async () => {
  const route = useRoute();
  if (route.query.code) {
    const apiURL = `http://localhost:3000/auth/api42?${stringifyQuery(
      route.query
    )}`;
    await $fetch(apiURL).catch((error) => console.log(error));
  }
});
</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
/* stylelint-disable */

.authentication-link {
  position: absolute;
  width: 280px;
  height: 310px;
  top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.authentication-link:hover {
  border: solid;
}

.authentication-item {
  display: flex;
  justify-self: center;
  flex-shrink: auto;
  background-color: transparent;
  width: 100%;
}

.authentication-item div.img-svg {
  width: 100%;
}

.authentication-link p {
  width: 100%;
  border: solid;
  padding-left: 35px;
}

.authentication-link:hover p {
  border: none;
}
</style>
