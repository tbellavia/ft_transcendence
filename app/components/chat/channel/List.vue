<template>
  <div class="channels-component">
    <ChatChannelJoinOrCreate />
    <h3>Channels joined</h3>
    <ul class="list-channels">
      <li v-for="channel in channelsJoined">
        <NuxtLink :to="`/${authUser.username}/chat/${channel}?isChannel`">
          <div class="channel-item">{{ channel }}</div>
        </NuxtLink>
      </li>
    </ul>
    <h3>Channels invitations</h3>
    <input type="password" placeholder="channel password" v-model="channelPassword" />
    <ul class="list-channels">
      <li v-for="channel in channelsInvited">
        <button @click="acceptInvite(channel)">{{ channel }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const channelsJoined = ref<string[]>([]);
const channelsInvited = ref<string[]>([]);
const authUser = await useGetUser();
const socket = useSocketChat();

//fetch all channels joined
socket.value.emit('get_all_channels_joined', {}, (channelsFetched: string[]) => {
  channelsJoined.value = channelsJoined.value.concat(channelsFetched);
})

socket.value.emit('get_all_channels_invited', {}, (channelsFetched: string[]) => {
  channelsInvited.value = channelsInvited.value.concat(channelsFetched);
})

//watch joining or creating channel events
socket.value.on('receive_create_channel', (channel: string) => {
  channelsJoined.value.push(channel);
});

socket.value.on('receive_join_channel', ({ username, channelName }: {username: string, channelName: string}) => {
  if (username == authUser.value.username)
    channelsJoined.value.push(channelName);
});

socket.value.on('receive_invite_channel', (channel: string) => channelsInvited.value.push(channel));
const channelPassword = ref('');
function acceptInvite(channel: string) {
  socket.value.emit('join_channel', {
    name: channel,
    password: channelPassword.value
    },
    () => {
      channelsInvited.value.splice(channelsInvited.value.findIndex(channelName => channelName == channel), 1);
    }
  );
}

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
