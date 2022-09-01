<template>
	<div>
		Double Authentication : 
		<label class="switch">
      <input type="checkbox" v-model="value" >
      <span class="slider round" ></span>
		</label>
	
		<div>

			<!-- https://lightrun.com/answers/vuetifyjs-vuetify-documentation-v-slotactivator-on-
			https://ramblings.mcpher.com/snipgraphql/vuejs/vuejs-and-vuetify-what-does-v-on-mean/ -->
			<div id="app">
  <v-app id="inspire">
    <v-row justify="center">
      <v-dialog
        v-model="activatePopup"
        persistent
        max-width="290"
      >
        <template v-slot:activator="{ on: activatePopup }">
        <!-- <template v-on:click="test"> -->
			<v-switch
			v-model="userChoice"
			v-bind="userChoice"
			v-on="activatePopup" >
     	 </v-switch>
          <!-- <v-btn
            color="primary"
            dark
			v-on="activatePopup"
			v-bind="activatePopup"
          >
            Open Dialog
          </v-btn> -->
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Double Authentication:
          </v-card-title>
		  <v-spacer></v-spacer>
		  <v-card-item>
			  <div id=QrCode v-html="svg?.outerHTML"></div>
		  </v-card-item>
          <v-card-actions>
            <v-spacer></v-spacer>
			<v-btn
              color="green darken-1"
              text
              @click="activatePopup = false"
            >
              Disagree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</div>
</div>

		<!-- <Teleport to="main">
			<div v-if="open" class="modal">
				<div> Qr code You need for login </div>
				<div id=QrCode v-html="svg.outerHTML"></div>
		  <button @click="open = false">Close</button>
		</div>
	  </Teleport> -->
	  <!-- {{ svg?: svg }} -->

	</div>
</template>
	

	
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['userChoiceDoubleAuth'])
const emit = defineEmits(['update:modelValue'])

let svg = ref();
let activatePopup = ref(true);
let open = ref(true);
let userChoice = ref(false);

function test() {
	console.log("OK");
	activatePopup.value = true;
	userChoice.value = true;
}

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

watch(userChoice, (newUserChoice) => {
	console.log(`user choice: ${userChoice.value}`);
	if (userChoice.value == true) {
		generateQrCode();
		activatePopup.value = true;
	}
})


const value = computed({
	get() {
		return props.userChoiceDoubleAuth // choix de l'utilisateur
	},
	set(value) {
	console.log(value)
		if (value == true) {
			 generateQrCode()
				.then( () => open.value = true )
				.catch(error => console.warn(error));
		}
		else {
			open.value = false;
		}
	}
})
</script>
	
	
<style scoped>
.modal {
	position: fixed;
	background-color: var(--grey-color);
	opacity: 100%;
	z-index: 999;
	top: 20%;
	left: 30%;
	width: 350px;
	height: 400px;
	border: solid;
}

.modal div {
	position:relative;
	padding: 10%;
}

/* div#QrCode {
} */
</style>
