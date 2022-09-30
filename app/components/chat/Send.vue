<template>
  <div class="send-chat">
    <form action="" @submit.prevent="sendMessage">
        <input type="text" placeholder="type message to sent" v-model="message"/>
    </form>
  </div>
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
  socket.value.emit(
    'send_message',
    {
      message: message.value,
      ...props
    },
    () => message.value = ''
  );
}
</script>

<style scoped>
  .error {
    color: var(--error-color);
    background-color: var(--background-error-color);
    padding-left: 0.2rem;
  }

  .send-chat {
    background-color: var(--background-line-color);
  }

  input {
    width: 100%;
    color: var(--main-color-dark);
    border-color: var();
  }

</style>