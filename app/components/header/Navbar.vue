<template>
  <nav class="navbar">
    <!-- TODO User name  -->
    <div class="link">
    <NuxtLink to="/homePage/profileParameters">PROFILE</NuxtLink>
    <NuxtLink to="/homePage/friendsList">FRIENDS</NuxtLink>
    <NuxtLink to="/homePage/matchHistory">MATCH HISTORY</NuxtLink>
  </div>

    <div class="navbar-right">
      <headerButtonChangeTheme class="navbar-sub" />
      <headerButtonDisconnect class="navbar-sub" />
    </div>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>

.link {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
}

a {
  display: block;
  align-self: center;
  height: 60px;
  width: 150px;
  font-size: 18px;
  text-align: center;
  padding-top: 15px;
  text-decoration: none;
}
/* home route and active route will show in bold as it matches / and /about */
a.router-link-active {
  border-bottom: solid;
}


</style>
