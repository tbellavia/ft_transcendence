<template>
  <ul>
    <li>

    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  channel: {
    required: true
  }
})

const socket = useSocketChat();
</script>

<style scoped>

</style>