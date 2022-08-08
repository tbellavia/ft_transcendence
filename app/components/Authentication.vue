<!-- Please remove this file from your project -->
<template>
  <div>
    <main class="main">
      <div class="authentication-link">
        <a href="#">
          <WhiskeyRose />
        </a>
      </div>
    </main>

    <!-- <links /> // authors and studioGame -->
  </div>
</template>

<script>
import WhiskeyRose from './Svg/WhiskeyRose.vue';
import NavBar from './NavBar.vue'
import LogoParam from './Svg/logo-param.vue';

export default {
    name: "Authentication",
    components: { WhiskeyRose, NavBar, LogoParam },
    methods: {
      isAuthenticate() {
        return true;
      }
    }
}
</script>

<style>
  .authentication-link {
    display: flex;
    align-items: center;
  }

</style>
