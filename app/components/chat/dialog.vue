<template>
  <div class="dialog-box">
    <!-- Displaying chat messages area -->
    <ul>
      <h2>{{ target }}</h2>
      <li v-for="message in messages">
        <p>
          <span class="author">{{ message.from }}:</span>
          {{ message.message }}
        </p>
      </li>
    </ul>
    <ChatSend @messageSend="messageSend" :target="target" :isChannel="isChannel" />
  </div>
</template>

<script lang="ts" setup>
// Target is the name of the discussion (username or channel)
// isChannel control if the name target a channel discussion
defineProps({
  isChannel: Boolean,
  target: {
    type: String,
    required: true
  },
});

// Interface and ref for displaying messages
interface chatMessage {
  message: string;
  from: string;
};
const messages = ref<chatMessage[]>([]);

// Global shared socket chat that received messages
const socket = useSocketChat();
socket.value.on('receive_message', chatMessage => {
  messages.value.push(chatMessage);
})

function messageSend(message: chatMessage) {
  messages.value.push(message);
}
</script>

<style scoped>
  ul {
    width: 25vw;
    height: 80vh;
    color: var(--main-color);
    border: solid var(--background-line-color);
    background-color: var(--main-color-darker);
  }

  input::placeholder {
    color: var(--main-color);
  }

  input {
    color: var(--main-color);
  }

  h2 {
    padding: 0.2rem;
    text-align: center;
    background-color: var(--background-line-color);
  }
</style>