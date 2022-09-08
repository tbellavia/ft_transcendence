<template>
  <form action="" @submit="sendMessage">
      <input type="text" placeholder="message" v-model="message"/>
      <input type="submit" />
  </form>
</template>

<script lang="ts" setup>
// Target is the name of the discussion (username or channel)
// isChannel control if the name target a channel discussion
const props = defineProps({
  isChannel: Boolean,
  target: {
    type: String,
    required: true
  },
});

// Interface and refs for sending messages
interface sendMessage {
  message: string;
  target: string;
  isChannel: boolean;
}

const message = ref<string>('');
const socket = useSocketChat();
function sendMessage() {
  socket.value.emit('send_message', {
    message: message.value,
    ...props
  });
}
</script>