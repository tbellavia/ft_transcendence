<template>
  <!-- Displaying chat messages area -->
  <ul class="display-chat">
    <li v-for="message in messages">
      <p>
        <span class="author">{{ message.from }}</span>
        {{ message.message }}
      </p>
    </li>
  </ul>

  <!-- Send message -->
  <form action="#" submit="sendMessage">
    <input type="text" />
  </form>
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
const ctx = useContext();

</script>