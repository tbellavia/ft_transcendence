<template>
  <form @submit.prevent="joinOrCreateChannel" class="channel-join-or-create">
    <input class="channel-create" type="text" required placeholder="channel name" v-model="channelName" />
    <input class="channel-create" type="password" placeholder="channel password" v-model="channelPassword" />
    <label class="channel-option" >
      <p>private channel</p>
      <input type="checkbox" v-model="channelIsPrivate" />
    </label>
    <input class="channel-validate-create" type="submit" value="Join" @click="event = 'join_channel'"/>
    <input class="channel-validate-create" type="submit" value="Create" @click="event = 'create_channel'"/>
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
  channelError.value = '';
  socket.value.emit(
    event.value,
    {
      name: channelName.value,
      password: channelPassword.value ? channelPassword.value : undefined,
      private: channelIsPrivate.value
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

  .channel-join-or-create {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .channel-option {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: flex-start;
  }

  .channel-option input[type="checkbox"] {
    flex: 2;
    margin: 0.2em 2em;
  }

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