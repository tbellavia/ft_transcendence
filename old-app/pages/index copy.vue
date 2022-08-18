<template>
<div>
  <header>
    <NavBar />
  </header>
  <Authentication />

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Authentication from '@/components/Authentication.vue'
import NavBar from '@/components/NavBar.vue'

export default Vue.extend({
    name: "IndexPage",
    components: { Authentication, NavBar }
})
</script>
