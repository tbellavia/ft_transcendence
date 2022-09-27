<template>
  <div class="chat-channel-parameters">
    <ChatChannelUsersList :channelName="channelName" />
    <fieldset>
      <button @click="leaveChannel">Leave Channel</button>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{channelName: string}>();

// Leave channel method
const socket = useSocketChat();
function leaveChannel() {
  socket.value.emit(
    'leave_channel',
    props.channelName
  );
}

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
  .chat-channel-parameters {
    display: flex;
    flex-direction: column;
  }
</style>