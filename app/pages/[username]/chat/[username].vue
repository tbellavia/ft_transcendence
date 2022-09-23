<template>
  <div class="chat-target-page">
    <ChatDialog class="chat-dialog" :target="username" :isChannel="isChannel"></ChatDialog>
    <ChatChannelParameters class="chat-channel-parameters" v-if="isChannel" :channelName="username" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
let username = ref('');
let isChannel = ref(false);

username.value = String(route.params.username);
if ('isChannel' in route.query) {
  isChannel.value = true;
}
</script>

<style scoped>
  /* Layout of the target page (channel or user dialog) */
  .chat-target-page {
    display: flex;
    height: 100%;
  }

  .chat-dialog {
    flex: 1;
  }

  .chat-channel-parameters {
    min-width: max-content;
  }

</style>