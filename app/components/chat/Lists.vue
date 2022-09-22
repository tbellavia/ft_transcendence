<template>
  <div class="list-box">
    <div class="list-selectors">
      <button @click="listSelector = 'friends'"> Friends </button>
      <button @click="listSelector = 'all'"> All Users </button>
      <button @click="listSelector = 'channels'">Channels</button>
    </div>

    <Suspense v-if="listSelector == 'friends'">
      <userpageListFriends />
    </Suspense>
    <Suspense v-else-if="listSelector == 'all'">
      <userpageListUsers />
    </Suspense>
    <Suspense v-else-if="listSelector == 'channels'">
      <ChatChannelList />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
let listSelector = ref('friends');
</script>

<style>
  .list-box {
    border: 0.2rem solid var(--main-color-darker);
  }

  /* Layout of list items */

  .list-selectors {
    display: flex;
    justify-content: space-around;

    background-color: var(--background-line-color);
  }
</style>