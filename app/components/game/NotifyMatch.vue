<template>
  <v-dialog v-model="hasSuggestionOfMatch">
    <v-card>
      <v-card-title>You have a match suggestion from {{fromUser}}</v-card-title>
      <v-card-actions class="invite-buttons">
        <v-btn @click.stop="handleInvite(true)">Accept</v-btn>
        <v-btn @click.stop="handleInvite(false)">Deny</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const socket = useSocket();
let isInGame = false;
socket.value.emit('get_status', status => {
  if (status == 'in a game')
    isInGame = true;
  else
    isInGame = false;
})

const fromUser = ref('');
const hasSuggestionOfMatch = ref(false);
const socketGame = useSocketGame();
socketGame.value.on('asking-match', (username: string) => {
  if (!isInGame) {
    fromUser.value = username;
    hasSuggestionOfMatch.value = true;
  }
});

function handleInvite(accept: boolean) {
  const responseEmit = accept ? 'accept-match' : 'refuse-match';
  socketGame.value.emit(responseEmit, fromUser.value);
  hasSuggestionOfMatch.value = false;
  fromUser.value = '';
}

</script>

<style scoped>
 .invite-buttons {
  display: flex;
  justify-content: space-evenly;
 }
</style>
