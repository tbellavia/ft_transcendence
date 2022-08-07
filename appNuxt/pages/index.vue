<template>
  <div>
    <Authentication />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Authentication from '@/components/Authentication.vue'

export default Vue.extend({
    name: "IndexPage",
    components: { Authentication }
})
</script>
