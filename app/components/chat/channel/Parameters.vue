<template>
  <fieldset>
    <button @click="leaveChannel">Leave Channel</button>
  </fieldset>
</template>

<script setup lang="ts">
const props = defineProps({
  target: {
    required: true,
    type: String
  }
});

const route = useRoute();
const socket = useSocketChat();
function leaveChannel() {
  socket.value.emit(
    'leave_channel',
    props.target
  );
}

const user = await useGetUser();

// When user leave channel if it's currently load channel, load the main chat page
socket.value.on(
  'receive_leave_channel',
  async ({username, channel}) => {
    if (user.value.username == username && channel.name == props.target)
      await navigateTo(route.fullPath.slice(0, route.fullPath.lastIndexOf('/')));
  }
)

</script>