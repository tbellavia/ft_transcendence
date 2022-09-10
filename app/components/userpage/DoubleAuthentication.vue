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
              v-bind="userChoice"
              v-on="activatePopup" >
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
            <userpageDoubleAuthenticationForm 
              justify="center" 
              @DoubleAuthValidate="printOk; activatePopup=false"/>
            </v-card-actions>

          </v-card>
        </v-dialog>
</div>
</template>
	

	
<script setup lang="ts">
import Xmark from '../svg/Xmark.vue';

/*
** test for form 
*/
function printOk(){
  activatePopup = false;
};

let svg = ref();
let activatePopup = ref(false);
let userChoice = ref(false);  // TODO: a recuperer sur l'api.

/*
** Generate Qr Code for 2fa
*/
async function generateQrCode() {
	const { data: qrCode } = await useApiFetch('/2fa/generate', {
		method: 'POST'
	});
	const temp = document.createElement('temporary');
	temp.innerHTML = qrCode.value.trim();
	svg.value = temp.firstChild;

	for (let i = 0; i < svg.value.children.length; ++i) {
		svg.value.children[i].setAttribute('stroke', 'currentColor');
		svg.value.children[i].setAttribute('fill', 'none');
	}
	return (true);
}


/*
** Watcher of switch activator for Double Authentication
*/
watch(userChoice, (newUserChoice) => {
	console.log(`user choice: ${userChoice.value}`);
	if (userChoice.value == true) {
		generateQrCode()
      .then( () => activatePopup.value = true )
 		  .catch(error => console.warn(error));
	}
})
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

/* div#QrCode {
} */
</style>
