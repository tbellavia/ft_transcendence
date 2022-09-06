<template>
  <div>
			<!-- https://lightrun.com/answers/vuetifyjs-vuetify-documentation-v-slotactivator-on-
			https://ramblings.mcpher.com/snipgraphql/vuejs/vuejs-and-vuetify-what-does-v-on-mean/ -->
    <div id="DA">
      <v-row justify="center" left="100%">
          <v-dialog
            v-model="activatePopup"
            persistent
            max-width="290">
            <template v-slot:activator="{ on: activatePopup }">
              Double Authentication :
              <v-switch justify="center"
              v-model="userChoice"
              v-bind="userChoice"
              v-on="activatePopup" >
              </v-switch>
           </template>
          <v-card density="comfortable">
            <v-card-title justify="center" class="text-h5">
               Scan the qrCode
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-item>
              <div id=QrCode v-html="svg?.outerHTML"></div>
            </v-card-item>
            <v-spacer></v-spacer>
            <v-card-actions>
            <userpageDoubleAuthenticationForm 
              justify="center" 
              @DoubleAuthValidate="printOk; activatePopup=false"/>
            </v-card-actions>
            <v-card-actions>
            <v-btn justify="center"
              color="green darken-1"
              text
              @click="activatePopup = false; userChoice = false"
            >
              Cancel
            </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <otp-input
        v-model="token"
        size="0"
      ></otp-input>

     
      <!-- <form method="get" class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
	<input type="text" id="digit-1" name="digit-1" data-next="digit-2" />
	<input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" />
	<input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" />
	<span class="splitter">&ndash;</span>
	<input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" />
	<input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" />
	<input type="text" id="digit-6" name="digit-6" data-previous="digit-5" />
</form> -->
  </div>
</div>
</template>
	

	
<script setup lang="ts">
import { computed } from 'vue'
import VOtpInput from 'vue3-otp-input';

export default defineComponent({
  name: 'App',
  components: {
    VOtpInput,
  },
  setup() {
    const otpInput = ref(null)

    const handleOnComplete = (value: string) => {
      console.log('OTP completed: ', value);
    };

    const handleOnChange = (value: string) => {
      console.log('OTP changed: ', value);
    };

     const clearInput = () => {
      otpInput.value.clearInput()
    }

    return { handleOnComplete, handleOnChange, clearInput, otpInput };
  },
});


let token = ref(1230564);








// const props = defineProps(['userChoiceDoubleAuth'])
// const emit = defineEmits(['update:modelValue'])
function printOk(){
  activatePopup = false;
};

let svg = ref();
let activatePopup = ref(false);
let userChoice = ref(false);

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
		generateQrCode()
      .then( () => activatePopup.value = true )
 		  .catch(error => console.warn(error));
	}
})


// const value = computed({
// 	get() {
// 		return props.userChoiceDoubleAuth // choix de l'utilisateur
// 	},
// 	set(value) {
// 	console.log(value)
// 		if (value == true) {
// 			 generateQrCode()
// 				.then( () => open.value = true )
// 				.catch(error => console.warn(error));
// 		}
// 		else {
// 			open.value = false;
// 		}
// 	}
// })
</script>
	
	
<style scoped>

otp-inputtt {
  width: 10px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}


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

.v-card {
  left: -30%;
  background-color: var(--grey-color);
  opacity: 90%;
  border: solid;
  border-color: var(--main-color-darker);
}
/* div#QrCode {
} */
</style>
