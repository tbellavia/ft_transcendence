<template>
  <div class="send-chat">
    <form action="" @submit.prevent="sendMessage">
        <input type="text" placeholder="type message to sent" v-model="message"/>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
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
  error.value = '';
  socket.value.emit('send_message', {
    message: message.value,
    ...props
  });
}

// Captures errors on exception and display them
const error = ref<string>('');
socket.value.on('exception', ({ message }) => {
  error.value = message;
});
</script>

<style scoped>
  .error {
    color: red;
  }

  .send-chat {
    background-color: var(--background-line-color);
  }

  input {
    padding: 0.2rem;
    width: 100%;
    color: var(--main-color);
  }

  input::placeholder {
    text-align: center;
  }
</style>