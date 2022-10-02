<template>
  <v-dialog id="chat" v-model="mutePopup">
    <template v-slot:activator>
      <button class="OptionsProfile_sub" @click="mutePopup=true">Mute User</button>
    </template>

    <v-card>
      <v-card-title>
        Mute User
      </v-card-title>

      <select v-model="selectedMute">
        <option v-for="muteTime in muteTimes" :value="muteTime.value">
          {{muteTime.text}}
        </option>
      </select>
      <v-card-actions>
        <v-btn @click="muteUser">
          Mute User
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    required: true,
    type: String
  },
	channelName: {
		required: true,
		type: String
	},
});

let mutePopup = ref(false);
const muteTimes = ref([
  {text: '10 seconds', value: 10000},
  {text: '2 minutes', value: 120000},
  {text: '5 minutes', value: 300000},
  {text: '10 minutes', value: 600000},
  {text: '20 minutes', value:  1200000 },
  {text: '30 minutes', value: 1800000},
  {text: '1 hour', value: 3600000}
]);

let selectedMute = ref(120000);
const socket = useSocketChat();

function muteUser() {
  socket.value.emit(
    'mute_channel_user',
    {
      name: props.channelName,
      username: props.name,
      durationMs: selectedMute.value
    }
  );
}
</script>

<style scoped>
  select, option {
    color: var(--main-color);
    border: solid 0.3em var(--main-color);
    background-color: var(--main-color-darker);
  }
</style>