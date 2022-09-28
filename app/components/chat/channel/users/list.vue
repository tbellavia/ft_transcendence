<template>
  <ul>
    <li v-for="user in users">
      <ChatChannelUsersUserItem :name="user.username" :is-moderator="user.isModerator" :channel-name="channelName" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Channel } from '~/interfaces/channel.interface';

const props = defineProps<{channelName: string}>();

// Fetch all user's info of channel
interface ChannelUser {
  username: string;
  isOwner: boolean;
  isModerator: boolean;
}
const users = ref<ChannelUser[]>([]);
const socket = useSocketChat();

onBeforeMount(async () => refreshChannelInfos());

function refreshChannelInfos() {
  socket.value.emit(
    'get_channel_infos',
    props.channelName,
    (channel: Channel) => {
      users.value = channel.users.map(chanUser => {
        return {
          username: chanUser,
          isOwner: chanUser == channel.owner,
          isModerator: channel.moderators.find(moderator => moderator == chanUser) != undefined || chanUser == channel.owner
        };
      });
    }
  );
}

// Update list of users when joining or leaving
socket.value.on(
  'receive_join_channel',
  ({username, channelName}) => {
    if (channelName == props.channelName) {
      users.value.push({
        username,
        isOwner: false,
        isModerator: false
      });
    }
  }
);

const user = getUserAuthenticate();
socket.value.on(
  'receive_leave_channel',
  ({username, channelName}) => {
    if (user.value && user.value.username != username && channelName == props.channelName) {
      if (users.value.length != 1)
        refreshChannelInfos();
    }
  }
);

socket.value.on(
  'receive_ban_channel_user',
  ({username, channelName}) => {
    if (user.value && user.value.username != username && channelName == props.channelName) {
      users.value.splice(users.value.findIndex(chanUser => chanUser.username == username), 1);
    }
  }
)
</script>

<style scoped>

</style>