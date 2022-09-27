<template>
  <div>
    <fieldset>
      <button @click="leaveChannel">Leave Channel</button>
      <div v-if="isModerator">
        <hr />
        <h2>Moderator options</h2>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{channelName: string}>();

const socket = useSocketChat();

// Fetch if is channel moderator
const isModerator = ref(false);
socket.value.emit('is_channel_moderator', props.channelName, (isChanModerator: boolean) => {
  isModerator.value = isChanModerator;
});

// Leave channel method
function leaveChannel() {
  socket.value.emit(
    'leave_channel',
    props.channelName
  );
}
</script>