<template>
  <nuxtLayout>
    <div class="index-page">
      <div class="auth-pages-btns">
        <NuxtLink class="index-password" to="password">Login With Password</NuxtLink>
        <NuxtLink class="index-password" to="api42">Login with api42</NuxtLink>
      </div>
      <div class="auth-page">
        <NuxtPage />
        <AuthenticationDoubleAuthValidator v-if="double_auth_enabled" />
      </div>
    </div>
  </nuxtLayout>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
import { UserInfos } from '~~/classes/User.class';
import { getRefreshedUserAuthenticate } from '~~/composables/useUserAuthentified';

let double_auth_enabled = ref(false);
const { $eventBus } = useNuxtApp();
$eventBus.$on('connect', async (userInfos: UserInfos) => {
  double_auth_enabled.value = userInfos.double_auth_enabled;

  let socket = useSocket();
  if (socket.value.disconnected)
    socket.value.connect();
  if (!double_auth_enabled.value) {
    const user = await getRefreshedUserAuthenticate();
    await redirectIfConnected(`/${user.value.username}`, '/');
  }
});
</script>

<style>
  .index-page {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: fit-content;
  }

  .auth-pages-btns {
    flex: 1;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .auth-pages-btns a {
    margin: 1rem;
  }

  .auth-page {
    flex: 2;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
  }

.index-password {
  padding: 10px;
  text-decoration: none;
  border: solid 1px;
  text-align: center;
  min-width: 200px;
}
</style>
