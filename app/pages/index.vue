<template>
    <div class="index-page">
      <div class="auth-pages-btns">
        <NuxtLink to="password">Login With Password</NuxtLink>
        <NuxtLink to="api42">Login with api42</NuxtLink>
      </div>
      <div class="auth-page">
        <NuxtPage />
      </div>
    </div>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
/**
 * Check if user is connected using api endpoints
 * if connected redirect to page
 * @param page the page to redirect user
 */
async function redirectIfConnected(page: string, otherPage: string) {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/isConnected")
    .then(async () => await navigateTo(page))
    .catch(async () => await navigateTo(otherPage));
}

onMounted(async () => {
  useRefreshUser();
  const user = await useGetUser();
  if (user)
    await redirectIfConnected('/' + user.value.username, '/');
})

const { $eventBus } = useNuxtApp();
$eventBus.$on('connect', async () => {
  useRefreshUser();
  const user = await useGetUser();
  if (user)
    await redirectIfConnected('/' + user.value.username, '/')
});
</script>

<style>
  .index-page {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
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
</style>
