<template>
  <form @submit.prevent="joinOrCreateChannel" class="channel-join-or-create">
    <input type="text" placeholder="channel name" v-model=channelName />
    <input type="password" placeholder="channel password" v-model=channelPassword />
    <input type="submit" value="Join" @click="event = 'join_channel'"/>
    <input type="submit" value="Create" @click="event = 'create_channel'"/>
  </form>
  <p v-if="channelError" style="color: red;">{{ channelError }}</p>
</template>

<script setup lang="ts">
const event = ref('join_channel');
const channelName = ref('');
const channelPassword = ref('');

const socket = useSocketChat();

function joinOrCreateChannel() {
  channelError.value = '';
  socket.value.emit(
    event.value,
    {
      name: channelName.value,
      password: channelPassword.value ? channelPassword.value : undefined
    },
    () => {
      //TODO: redirect to the newly created or joined chat
    }
  );
}

// Captures errors on exception and display them
const channelError = ref<string>('');
socket.value.on('exception', ({ message }) => {
  channelError.value = message;
});
</script>

<style scoped>
  input {
    display: block;
    padding: 0.2rem;
    width: 100%;
    color: var(--main-color);
  }

  input::placeholder {
    text-align: center;
  }
</style>