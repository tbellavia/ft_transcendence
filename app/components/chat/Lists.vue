<template>
  <div class="list-box">
    <div class="list-selectors">
      <button @click="listSelector = 'friends'"> Friends </button>
      <button @click="listSelector = 'all'"> All Users </button>
    </div>
    <Suspense v-if="listSelector == 'friends'">
      <userpageListFriends />
    </Suspense>
    <Suspense v-else-if="listSelector == 'all'">
      <userpageListUsers />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
let listSelector = ref('friends');
</script>

<style>
  .list-box {
    min-width: 15%;
    max-width: 20%;
  }

  .list-selectors {
    display: flex;
    justify-content: space-around;
  }
</style>