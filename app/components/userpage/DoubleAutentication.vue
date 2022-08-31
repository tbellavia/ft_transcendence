<template>
	<div>
		Double Authentication : 
		<label class="switch">
      <input type="checkbox" v-model="value" >
      <span class="slider round" ></span>
		</label>
	
		<Teleport to="main">
			<div v-if="open" class="modal">
				<div> Qr code You need for login </div>
				<div id=QrCode v-html="svg.outerHTML"></div>
		  <button @click="open = false">Close</button>
		</div>
	  </Teleport>
	  <!-- {{ svg?: svg }} -->

	</div>
</template>
	
	
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['userChoiceDoubleAuth'])
const emit = defineEmits(['update:modelValue'])

let svg = ref();
let open = ref(false);

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
}


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

div#QrCode {
}
</style>
