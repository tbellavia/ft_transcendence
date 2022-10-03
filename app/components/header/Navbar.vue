<template>
  <nav class="navbar">
    <!-- TODO User name  -->
  <div class="link">
    <NuxtLink class="navbar-left" v-if="disconnectButton" v-for="(link, index) in links" :key="`${link.name}${index}`" :to="`/user/${username}/${link.link}`">{{ link.name }}</NuxtLink>
  </div>
    <div class="navbar-right">
      <headerButtonChangeTheme class="navbar-sub" />
      <headerButtonDisconnect v-if="disconnectButton" class="navbar-sub" />
    </div>
  </nav>
</template>

<script setup lang="ts">

const disconnectButton = ref(false);// TODO mai-fliend eithan
try {
  const user = await getRefreshedUserAuthenticate();
  if (user.value)
    disconnectButton.value = true;
} catch { } // TODO mai-fliend eithan

  const links = ref([
    {name: 'PROFILE', link: 'profile'},
    {name: 'FRIENDS', link: 'friendsList'},
    {name: 'CHAT', link: 'chat'},
    {name: 'GAME', link: 'game'}
  ]);
  const user = getUserAuthenticate();
  const username = user.value.username ? user.value.username : 'Default';
  const inGame = ref(user.value.isInGame)


  // async function getNavbarNavigateLink(link) {
  //   const user =  await getRefreshedUserAuthenticate();
  //   return user.value.isInGame ? '' : `/${username}/${link}`;
  // }
</script>

<style scoped>

.link {
    height: 60px;
    width: 100%;
    display: flex;

}

a {
  height: 60px;
  width: 150px;
  font-size: 18px;
  text-decoration: none;
  
  display: block;
  text-align: center;
  padding-top: 15px;
}
/* home route and active route will show in bold as it matches / and /about */
a.router-link-active {
  border-bottom: solid;
}


</style>
