<template>
  <div class="dialog-box">
    <!-- Displaying chat messages area -->
    <h2>{{ target }}</h2>
    <ul>
      <li v-for="message in messages">
        <p>
          <span class="author">{{ message.author }}:</span>
          {{ message.content }}
        </p>
      </li>
    </ul>
    <ChatSend class="chat-input" :target="target" :isChannel="isChannel" />
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

// Interface and ref for displaying messages
interface ChatMessage {
  author: string;
  content: string;
};
const messages = ref<ChatMessage[]>([]);

// Global shared socket chat that received messages
const socket = useSocketChat();
// Fetch all messages in onMounted
onMounted(() => {
  socket.value.emit(
    'get_all_messages', 
    {...props},
    (response: ChatMessage[]) => {
      messages.value = messages.value.concat(response)
    }
  );
})

// When we received a message
socket.value.on('receive_message', chatMessage => {
  messages.value.push(chatMessage);
})
</script>

<style scoped>

  .dialog-box {
    display: flex;
    flex-direction: column;

    height: 100%;
  }

  .dialog-box > h2 {
    /*  */
  }

  .dialog-box > ul {
    flex-grow: 10;

    overflow-wrap: break-word;
    overflow-y: auto;

    color: var(--main-color);
    border: solid var(--background-line-color);
    background-color: var(--main-color-darker);
  }

  .dialog-box > .chat-input {
    /*  */
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