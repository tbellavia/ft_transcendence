<template>
  <div id="chat" class="list-channel-users">

    <div class="list-selectors">
      <h2>
        <button @click="displayBanUsers = false">
          Channel Users
        </button>
      </h2>
      <h2>
        <button @click="displayBanUsers = true">
          Ban Users
        </button>
      </h2>
    </div>

    <div v-if="!displayBanUsers">
      <ul>
        <li v-for="user in users">
          <ChatChannelUsersUserItem :name="user.username" :is-moderator="user.isModerator" :channel-name="channelName" />
        </li>
      </ul>
    </div>


    <div v-else>
      <ul>
        <li v-for="user in bannedUsers">
          <ChatChannelUsersUserItem is-ban :name="user" :channel-name="channelName" />
        </li>
      </ul>
    </div>

  </div>
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
const displayBanUsers = ref(false);


const bannedUsers = ref<string[]>([]);
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
      bannedUsers.value = channel.banned_users;
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
      bannedUsers.value.push(username);
      const index = users.value.findIndex(chanUser => chanUser.username == username);
      if (index != -1)
        users.value.splice(index, 1);
    }
  }
);

socket.value.on(
  'receive_unban_channel_user',
  ({username, channelName}) => {
    if (channelName == props.channelName) {
      const index = bannedUsers.value.findIndex(bannedUser => bannedUser == username);
      if (index != -1)
        bannedUsers.value.splice(index, 1);
    }
  }
)
</script>

<style scoped>
  .list-channel-users {
    display: flex;
    flex-direction: column;
  }

  .list-channel-users > div {
    flex: 1;
  }

  .list-selectors {
    display: flex;
    justify-content: space-between;
    height: fit-content;
  }

  .list-selectors > h2 {
    margin: 0 0.3em;
  }

</style>