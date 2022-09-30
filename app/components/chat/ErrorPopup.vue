<template>
  <v-dialog id="chat" v-model="hasException">
    <v-card class="chat-exception">
      <v-card-title>{{ chatException.status }}</v-card-title>
      <v-card-text>{{ chatException.message }}</v-card-text>

      <v-card-actions>
        <v-btn @click.stop="clearException">Done</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

/*
** Get channel exceptions
*/

enum SocketExceptionCodes {
  NOT_FOUND = 'NOT_FOUND',
  UNHAUTHORIZE = 'UNHAUTORIZE',
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

enum ChannelExceptionCodes {
  CHANNEL_CREATION_FAILED = 'CHANNEL_CREATION_FAILED',
  CHANNEL_JOIN_FAILED = 'CHANNEL_JOIN_FAILED',
  CHANNEL_UPDATE_FAILED = 'CHANNEL_UPDATE_FAILED',
  CHANNEL_FETCH_FAILED = 'CHANNEL_FETCH_FAILED'
};

interface ChannelException {
  status: SocketExceptionCodes | ChannelExceptionCodes;
  message: string
};

const chatException = ref<ChannelException>();
const hasException = ref(false);
const socket = useSocketChat();

socket.value.on('exception', (exception: ChannelException) => {
  chatException.value = exception
  hasException.value = true;
});

function clearException() {
  hasException.value = false;
}
</script>