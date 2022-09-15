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

onMounted(async () => {
  useRefreshUser();
  const user = await useGetUser();
  if (user.value?.username)
    await redirectIfConnected('/' + user.value.username, '/');
})

const { $eventBus } = useNuxtApp();
$eventBus.$on('connect', async () => {
  for (let tries = 3; tries; tries--) {
    useRefreshUser();
    const user = await useGetUser();
    if (user.value?.username)
    {
      console.log(user.value);
      console.log("double auth: ", user.value.is_two_factor_auth_enabled);
      if (user.value.is_two_factor_auth_enabled === true)
        await navigateTo('/doubleAuth', '/')
      else
        await redirectIfConnected('/' + user.value.username, '/')
    }
  }
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
