<template>
  <div class="chat-target-page">
    <ChatDialog class="chat-dialog" :target="target" :isChannel="isChannel"></ChatDialog>
    <ChatChannelOptions class="chat-channel-parameters" v-if="isChannel" :channelName="target" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
let target = ref('');
let isChannel = ref(false);

target.value = String(route.params.target);
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