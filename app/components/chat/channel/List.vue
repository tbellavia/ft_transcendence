<template>
  <div class="channels-component">
    <ChatChannelJoinOrCreate />
    <ul class="list-channels">
      <li v-for="channel in channels">
        <NuxtLink :to="`/${authUser.username}/chat/${channel}?isChannel`">
          <div class="channel-item">{{ channel }}</div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const channels = ref<string[]>([]);
const authUser = await useGetUser();
const socket = useSocketChat();

//fetch all existing channels
socket.value.emit('get_all_channels', {}, (channelsFetched: string[]) => {
  channels.value = channels.value.concat(channelsFetched);
})

//watch joining or creating channel events
socket.value.on('receive_create_channel', (channel: string) => {
  channels.value.push(channel);
});

const { $eventBus } = useNuxtApp();
socket.value.on('receive_join_channel', ({ username, channelName }: {username: string, channelName: string}) => {
  if (username == authUser.value.username)
    channels.value.push(channelName);
  $eventBus.$emit('receive_join_channel', {username, channelName});
});

</script>

<style>
  .channels-component {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .list-channels {
    font-size: 14px;
  }

  .list-channels a {
    text-decoration: none;
  }

  .channel-item {
    width: 100%;
    overflow-wrap: anywhere;
    border: thin solid var(--main-color-op-30);
    padding-left: 0.2rem;
  }

  .channel-item:hover {
    background-color: var(--main-color-op-10);
    color: var(--main-color-light);
    border-color: var(--main-color);
  }

  input:hover {
    background-color: var(--main-color-op-10);
  }

</style>
