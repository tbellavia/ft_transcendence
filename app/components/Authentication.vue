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

const emit = defineEmits({
  // Define connect event for notify the page
  // No validation checking for emit
  connect: null,
});

async function oauth42(code: string) {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch(`/auth/api42?code=${code}`)
    .then(() => emit("connect")) //Emit connection event when success)
    .catch((error) => console.warn(error));
}

// If code in query string it may be from 42api so we try to authenticate
onMounted(async () => {
  const route = useRoute();
  if (route.query.code) {
    await oauth42(route.query.code);
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
