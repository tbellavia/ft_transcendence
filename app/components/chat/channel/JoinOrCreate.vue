<template>
  <form @submit.prevent="joinOrCreateChannel" class="channel-join-or-create">
    <input class="channel-create" type="text" required placeholder="channel name" v-model="channelName" />
    <input class="channel-create" type="password" placeholder="channel password" v-model="channelPassword" />
    <input class="channel-validate-create" type="submit" value="Join" @click="event = 'join_channel'"/>
    <input class="channel-validate-create" type="submit" value="Create" @click="event = 'create_channel'"/>
    <input class="channel-checkbox" type="checkbox" v-model="channelIsPrivate" />
  </form>
  <div class="channel-create-error">
    <p v-if="channelError" style="color: var(--error-color); background-color: var(--background-error-color);">{{ channelError }}</p>
  </div>
</template>

<script setup lang="ts">
const event = ref('join_channel');
const channelName = ref('');
const channelPassword = ref('');
const channelIsPrivate = ref(false);

const socket = useSocketChat();

function joinOrCreateChannel() {
  socket.value.emit(
    event.value,
    {
      name: channelName.value,
      password: channelPassword.value ? channelPassword.value : undefined,
      isPrivate: channelIsPrivate
    },
    () => {
      channelError.value = '';
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
    padding-left: 0.8rem;
    width: 100%;
    color: var(--main-color);
    border: none;
  }

  input::placeholder {
    text-align: left;
    padding-left: 0.4rem;
  }

  .channel-validate-create {
  }

  .channel-create {
  }

  .channel-create-error {
    border: thin solid var(--main-color-dark);
  }

</style>