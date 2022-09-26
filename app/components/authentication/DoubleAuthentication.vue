<template>
  <div class="line" style="height: 20px;">
			<!-- https://lightrun.com/answers/vuetifyjs-vuetify-documentation-v-slotactivator-on-
			https://ramblings.mcpher.com/snipgraphql/vuejs/vuejs-and-vuetify-what-does-v-on-mean/ -->
        <v-dialog
          v-model="activatePopup"
          persistent
          max-width="400">
          <template  v-slot:activator="{ on: activatePopup }">
            <span class="line-sub"> Double Authentication :</span>
            <v-switch class="line-sub"
            v-model="userChoice"
            v-on:click="activatePopup" >
            <!-- Handle connection -->
            </v-switch>
          </template>

           <!-- Pop windows with Qr Code here -->
          <v-card density="comfortable">
            
            <!-- title and cancel button -->
            <v-card-title class="card-title" >
              <p class="card-title-sub">Scan the QR Code</p>
            <v-spacer></v-spacer>
              <div class="card-title-sub" style="height: 40px; width: 40px">
              <button class="xmark"  
                @click="activatePopup = false; userChoice = false"
              >
                <svgXmark style="height: 40px; width: 40px; display: flex"/>
              </button>
            </div>
            </v-card-title>
            <v-spacer></v-spacer>

            <!-- SVG Qr code -->
            <v-card-item>
              <div id=QrCode v-html="svg?.outerHTML"></div>
            </v-card-item>
            <v-spacer></v-spacer>
            <v-card-actions>

              <!-- formulaire pour recuperer la clé (component) -->
            <authenticationDoubleAuthenticationForm 
              justify="center" 
              @DoubleAuthValidate="validateTwoFactorAuthentication"/>
            </v-card-actions>

            <v-card-text style="margin: 0 auto;" v-if="errorMessage">{{ errorMessage }}</v-card-text>
          </v-card>
        </v-dialog>
</div>
</template>
	

	
<script setup lang="ts">

const { $apiFetch } = useNuxtApp();

/*
** Generate Qr Code for 2fa
*/
let svg = ref();
async function generateQrCode() {
	const qrCode = await $apiFetch('/2fa/generate', {
		method: 'POST'
	});
	const temp = document.createElement('temporary');
	temp.innerHTML = qrCode.trim();
	svg.value = temp.firstChild;

	for (let i = 0; i < svg.value.children.length; ++i) {
		svg.value.children[i].setAttribute('stroke', 'currentColor');
		svg.value.children[i].setAttribute('fill', 'none');
	}
	return (true);
}

/*************************************************************/

/*
** Watcher of switch activator for Double Authentication
*/
let errorMessage = ref('');
let userAuthentified = getUserAuthenticate();
let activatePopup = ref(false);
let userChoice = ref(userAuthentified.value.double_auth_enabled);  // TODO: a recuperer sur l'api.
watch(userChoice, (newUserChoice) => {
	if (newUserChoice == true) {
		generateQrCode()
      .then(() => activatePopup.value = true )
 		  .catch(error => console.warn(error));
  } else {
    // TODO: Disable 2fa for auth user
    $apiFetch('/2fa/turn-off', {method: 'DELETE'})
      .catch(error => errorMessage.value = error.data?.message || 'Unknown Error');
    userChoice.value = false;
  }
});

/*************************************************************/

/*
** Activate 2fa if code is valide
*/
async function validateTwoFactorAuthentication(code: string) {
  errorMessage.value = '';
  try {
    await $apiFetch('/2fa/turn-on', {
      method: 'POST',
      body: {
        code
      }
    });
    // Close pop-up when valid
    activatePopup.value = false;
  } catch (error) {
    if (Array.isArray(error.data.message))
      errorMessage.value = error.data.message.join('\r\n');
    else
      errorMessage.value = error.data.message;
  }
}

</script>
	
	
<style scoped>
.card-title {
  display: flex;
  justify-content: space-between;
} 

.card-title-sub {
  display: flex;
}

.xmark, .xmark:hover {
  height: 20px;
  width: 20px;
  background-color: transparent !important;
  display: flex;
  align-self: center;
}

.line {
  display: flex;
}

span.line-sub, switch.line-sub {
  display: flex;
  align-self: center;
}

</style>
