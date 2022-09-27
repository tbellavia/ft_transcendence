<template>
  <div id="chat" class="chat-channel-options">
    <ChatChannelUsersList :channelName="channelName" />
    <ChatChannelParameters :channelName="channelName" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{channelName: string}>();
const socket = useSocketChat();

// When user leave channel if it's currently load channel, load the main chat page
const user = getUserAuthenticate();
const route = useRoute();
socket.value.on(
  'receive_leave_channel',
  async ({username, channelName}) => {
    if (user.value && user.value.username == username && channelName == props.channelName)
      await navigateTo(route.fullPath.slice(0, route.fullPath.lastIndexOf('/')));
  }
);
</script>

<style scoped>
  .chat-channel-options {
    display: flex;
    flex-direction: column;
  }
</style>