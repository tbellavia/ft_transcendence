<template>
  <ul>
    <li v-for="user in users">
      <p>{{ user.username }}
        <span v-if="user.isOwner">Is Owner</span>
        <span v-else-if="user.isModerator">Is Moderator</span>
      </p>
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

onBeforeMount(async () => await refreshUserInfos());

function refreshUserInfos() {
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

const { $eventBus } = useNuxtApp();

// Update list of users when joining or leaving
$eventBus.$on(
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

socket.value.on(
  'receive_leave_channel',
  ({channel}) => {
    if (channel == props.channelName) {
      // Since owner may have change we fetch all infos again
      refreshUserInfos();
    }
  }
);
</script>

<style scoped>

</style>