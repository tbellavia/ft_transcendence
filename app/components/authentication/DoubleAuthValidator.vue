<template>
    <v-dialog
      persistent
      max-width="400">

      <!-- Pop windows with Qr Code here -->
      <v-card density="comfortable">
        <!-- title and cancel button -->
        <v-card-title class="card-title" >
          <p class="card-title-sub">double authentication</p>
        <v-spacer></v-spacer>
          <div class="card-title-sub" style="height: 40px; width: 40px">
          <button class="xmark"  
            @click="disconnect">
            <svgXmark style="height: 40px; width: 40px; display: flex"/>
          </button>
          </div>
        </v-card-title>
        <v-spacer></v-spacer>
   
        <v-card-actions>
        <userpageDoubleAuthenticationForm 
          justify="center" 
          @DoubleAuthValidate=""/>
        </v-card-actions>
      </v-card>
      </v-dialog>
</template>

<script setup lang="ts">
const { $apiFetch } = useNuxtApp();
async function disconnect() {
  await $apiFetch("/auth/disconnect")
    .then(async () => {
      const { $eventBus } = useNuxtApp();
      $eventBus.$emit('disconnect');
      await navigateTo("/")
    })
    .catch(async error => {
      console.warn(error);
      await navigateTo("/");
    });
}

</script>