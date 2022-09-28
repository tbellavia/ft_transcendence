<template>
  <div>
    <fieldset>
      <button @click="leaveChannel">Leave Channel</button>
      <div v-if="isModerator">
        <h2>Moderation interface</h2>
        <hr />
        <form @submit.prevent="inviteUser" class="channel-invite-user">
          <input type="text" placeholder="username" v-model="userInvited" />
          <input type="submit" value="Invite User" />
        </form>
        <div v-if="isOwner">
          <form @submit.prevent="updatePassword" class="channel-update-password">
            <input type="password" placeholder="channel password" v-model="channelPassword" />
            <div class="channel-submit-form">
              <input type="submit" value="Update Password" />
              <input type="submit" value="Reset Password" @click="clearPassword = true" />
            </div>
          </form>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{channelName: string}>();

const socket = useSocketChat();
// Fetch if is channel moderator and owner
const isModerator = ref(false);
const isOwner = ref(false);
socket.value.emit('is_channel_moderator', props.channelName, (isChanModerator: boolean) => {
  isModerator.value = isChanModerator;
});
socket.value.emit('is_channel_owner', props.channelName, (isChanOwner: boolean) => {
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

  fieldset > button {}

  .channel-update-password {
    display: flex;
    flex-direction: column;
  }
  .channel-submit-form {
    display: flex;
  }

  .channel-submit-form > input {
    flex: 1;
  }
</style>