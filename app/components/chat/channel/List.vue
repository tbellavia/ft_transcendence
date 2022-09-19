<template>
  <ChatChannelJoinOrCreate />
  <hr />
  <ul class="list-channels">
    <li v-for="channel in channels">
      <NuxtLink :to="channel.name">
        <h2>{{ channel.name }}</h2>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Channel {
  name: string;
  creator: string;
  moderators?: string[];
  users: string[];
}

const channels = ref<Channel[]>([]);
const authUser = await useGetUser();
const socket = useSocketChat();

//fetch all existing channels
socket.value.emit('get_all_channels', {}, (channelsFetched: Channel[]) => {
  channels.value = channels.value.concat(channelsFetched);
})

//watch joining or creating channel events
socket.value.on('receive_create_channel', channel => {
  channels.value.push(channel);
  console.log('Channel created!');
});
socket.value.on('receive_join_channel', ({ user, channel }) => {
  if (user.username === authUser.value.username)
    channels.value.push(channel)
});


</script>

<style>
</style>
