<template>
  <nav class="navbar">
    <!-- TODO User name  -->
  <div class="link">
    <NuxtLink v-for="link in links" :to="`/${username}/${link.link}`">{{ link.name }}</NuxtLink>
  </div>

    <div class="navbar-right">
      <headerButtonChangeTheme class="navbar-sub" />
      <headerButtonDisconnect class="navbar-sub" />
    </div>
  </nav>
</template>

<script setup lang="ts">
  const links = ref([
    {name: 'PROFILE', link: 'profileParameters'},
    {name: 'FRIENDS', link: 'friendsList'},
    {name: 'CHAT', link: 'chat'}
  ]);
  const user = await useGetUser();
  const username = user.value ? user.value.username : 'Default';
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
