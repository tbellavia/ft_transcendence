<template>
  <div class="chat-target-page">
    <ChatDialog class="chat-dialog" :target="username" :isChannel="isChannel"></ChatDialog>
    <ChatChannelParameters class="chat-channel-parameters" v-if="isChannel" :target="username" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  let username = ref('');
  let isChannel = ref(false);

  username.value = String(route.params.username);
  if ('isChannel' in route.query)
    isChannel.value = true;
</script>

<style scoped>
  .chat-target-page {
    display: flex;
    flex-direction: row;

    height: 100%;
  }

  .chat-dialog {
    flex: 10 1;
  }

  .chat-channel-parameters {
    flex: 1 10;
  }

</style>