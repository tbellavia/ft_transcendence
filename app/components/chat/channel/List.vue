<template>
  <div>
    <ChatChannelJoinOrCreate />
    <hr />
    <ul class="list-channels">
      <li v-for="channel in channels">
        <NuxtLink :to="`/${authUser.username}/chat/${channel}?isChannel`">
          <h2>{{ channel }}</h2>
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
</style>
