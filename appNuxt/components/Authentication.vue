<!-- Please remove this file from your project -->
<template>
  <div>
    <NavBar />
    <a href="#">
      <WhiskeyRose />
    </a>

    <!-- <links /> // authors and studioGame -->
  </div>
</template>

<script>
import WhiskeyRose from './Svg/WhiskeyRose.vue';
import NavBar from './NavBar.vue'

export default {
    name: "Authentication",
    components: { WhiskeyRose, NavBar }
}
</script>
