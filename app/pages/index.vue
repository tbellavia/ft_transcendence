<template>
  <div class="real-body">
    <header >
      <NavBar />
    </header>
    <main>
      <Authentication />
      <Copyright />
      <!-- <Testing_css /> -->
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Authentication from '~/components/Authentication.vue'
import NavBar from '~/components/NavBar.vue'
import LogoParam from '~/components/Svg/logo-param.vue'
import Testing_css from '~/components/testing_css.vue'
import Copyright from '~/components/Copyright.vue'

export default Vue.extend({
    name: "IndexPage",
    components: { Authentication, NavBar, LogoParam, Testing_css, Copyright }
})
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