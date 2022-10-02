<template>
  <!-- Pop windows with Qr Code here -->
  <v-dialog v-model="enableDialog">
    <v-card density="comfortable" class="v-card-2fa">
      <!-- title and cancel button -->
      <v-card-title class="card-title" >
        <p class="card-title-sub">double authentication</p>
      <v-spacer></v-spacer>
        <div class="card-title-sub" style="height: 40px; width: 40px">
        <button class="xmark" @click="disconnect">
          <svgXmark style="height: 40px; width: 40px; display: flex"/>
        </button>
        </div>
      </v-card-title>
      <v-spacer></v-spacer>

      <v-card-actions>
      <authenticationDoubleAuthenticationForm
        justify="center" 
        @DoubleAuthValidate="checkValidation" />
      </v-card-actions>

      <v-card-text v-if="errorMessage">{{ errorMessage }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const { $apiFetch, $eventBus } = useNuxtApp();

let enableDialog = ref<boolean>(true);
$eventBus.$on('connect', () => enableDialog.value = true);
async function disconnect() {
  await $apiFetch("/auth/disconnect")
    .then(() => {
      const { $eventBus } = useNuxtApp();
      $eventBus.$emit('disconnect');
      enableDialog.value = false;
    })
    .catch(() => {});
}

let errorMessage = ref('');
async function checkValidation(code: string) {
  errorMessage.value = '';
  await $apiFetch("2fa/authenticate", {
    method: 'POST',
    body: {
      code
    }
  })
  .then(async () => {
    // Load new user
    const user = await getRefreshedUserAuthenticate();
    await redirectIfConnected(`/${user.value.username}`, '/');
  })
  .catch(error => {
    if (Array.isArray(error.data.messsage))
      errorMessage.value = error.data.message.join(' ');
    else
      errorMessage.value = error.data.message;
  });
}
</script>

<style scoped>
  .v-card-2fa {
    background-color: var(--background-color);
    opacity: 90%;
  }
</style>