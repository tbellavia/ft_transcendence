<template>
    <v-dialog
      v-model="notConnected"
      persistent
      max-width="400">
      <template :activator="{ on: notConnected }"></template>

      <!-- Pop windows with Qr Code here -->
      <v-card density="comfortable">
        <!-- title and cancel button -->
        <v-card-title class="card-title" >
          <p class="card-title-sub">double authentication</p>
        <v-spacer></v-spacer>
          <div class="card-title-sub" style="height: 40px; width: 40px">
          <button class="xmark"  
            @click="notConnected = false">
            <svgXmark style="height: 40px; width: 40px; display: flex"/>
          </button>
          </div>
        </v-card-title>
        <v-spacer></v-spacer>
   
        <v-card-actions>
        <userpageDoubleAuthenticationForm 
          justify="center" 
          @DoubleAuthValidate="redirectIfConnected('/lvirgini', '/')"/>
        </v-card-actions>
      </v-card>
      </v-dialog>
</template>

<script setup lang="ts">
	const notConnected =ref(true);

</script>