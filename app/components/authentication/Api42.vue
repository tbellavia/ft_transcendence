<!-- Please remove this file from your project -->
<template>
  <div class="authentication-link">
    <p class="authentication-item">Click on Vault Boy to login with 42</p>
      <a class="authentication-vault-boy"
      href="https://api.intra.42.fr/oauth/authorize?client_id=4cdd93e38d50fce3af5d817a430542b75506fbacf0b777ba6dc3a2312730d18d&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi42&response_type=code">
        <svgBoy/>
      </a>
  </div>
</template>

<script setup lang="ts">
import { UserInfos } from '~~/classes/User.class';

async function oauth42(code: string) {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch(`/auth/api42?code=${code}`)
    .then(async (userInfos: UserInfos) => { 
      const { $eventBus } = useNuxtApp();
      $eventBus.$emit('connect', userInfos);
    })
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
  display: flex;
  flex-direction: column;
  border: solid;
  text-decoration: none;
  height: 380px;
}

.authentication-link:hover {
  background-color: transparent;
  color: var(--main-color);
}

.authentication-item {
  width: fit-content;
  padding: 10px;
}

.authentication-vault-boy {
  padding-left: 18px;
}
</style>
