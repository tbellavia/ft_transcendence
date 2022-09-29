<template>
  <div>
    <fieldset v-if="isModerator">
      <h2>Moderation interface</h2>
      <hr />

      <!-- Invite form -->
      <form @submit.prevent="inviteUser" class="channel-form">
        <h3>Invites</h3>
        <input type="text" placeholder="username" v-model="userInvited" />
        <input type="submit" value="Invite User" />
      </form>

      <!-- Ban form -->
      <form @submit.prevent="banOrUnbanUser" class="channel-form">
        <h3>Bans</h3>
        <input type="text" placeholder="username" v-model="userBanned" />
        <div class="channel-form-submit">
          <input type="submit" @click="banOrUnban = 'ban_channel_user'" value="Ban User" />
          <input type="submit" @click="banOrUnban = 'unban_channel_user'" value="Unban User" />
        </div>
      </form>

      <!-- Owner interface -->
      <div v-if="isOwner">
        <!-- Channel Parameters / password form -->
        <form @submit.prevent="updatePassword" class="channel-form">
          <h3>Channel parameters</h3>
          <input type="password" placeholder="channel password" v-model="channelPassword" />
          <div class="channel-form-submit">
            <input type="submit" value="Update Password" />
            <input type="submit" value="Reset Password" @click="clearPassword = true" />
          </div>
        </form>
      </div>
    </fieldset>
    <button id="leave-channel" @click="leaveChannel">Leave Channel</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{channelName: string}>();

const socket = useSocketChat();
// Fetch if is channel moderator and owner
const authUser = getUserAuthenticate();
const isModerator = ref(false);
const isOwner = ref(false);
socket.value.emit('is_channel_moderator', {
    name: props.channelName,
    username: authUser.value.username
  },
  (isChanModerator: boolean) => {
  isModerator.value = isChanModerator;
});
socket.value.emit(
  'is_channel_owner',
  {
    name: props.channelName,
    username: authUser.value.username
  },
  (isChanOwner: boolean) => {
    isOwner.value = isChanOwner;
  })

// Leave channel method
function leaveChannel() {
  socket.value.emit(
    'leave_channel',
    props.channelName
  );
}

// Invite user method
const userInvited = ref('');
function inviteUser() {
  socket.value.emit(
    'invite_user_in_channel',
    {
      channelName: props.channelName,
      username: userInvited.value
    }
  );
}

// Ban / Unban user
const banOrUnban = ref('ban_channel_user');
const userBanned = ref('');
function banOrUnbanUser() {
  socket.value.emit(banOrUnban.value, {
    name: props.channelName,
    username: userBanned.value
  });
}

// Update password methods
let clearPassword = ref(false);
let channelPassword = ref('');
function updatePassword() {
  socket.value.emit('update_channel', {
    name: props.channelName,
    password: clearPassword.value ? null : channelPassword.value
  });
  clearPassword.value = false;
}

</script>

<style scoped>
  .channel-form {
    display: flex;
    flex-direction: column;
  }

  .channel-form > * {
    text-align: center;
  }

  .channel-form-submit {
    display: flex;
  }

  .channel-form-submit > input[type="submit"] {
    flex: 1;
  }

  #leave-channel {
    display: block;
    margin: 0 auto;
    height: 2em;
  }
</style>