<template>
	<div>
		Double Authentication : 
		<label class="switch">
      <input type="checkbox" v-model="value" >
      <span class="slider round" ></span>
		</label>
	
	  <Teleport to="body">
		<div v-if="open" class="modal">
		  <p>Hello from the modal!</p>
		  <button @click="open = false">Close</button>
		</div>
	  </Teleport>
	</div>
</template>
	
	
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['userChoiceDoubleAuth'])
const emit = defineEmits(['update:modelValue'])

let open = ref(false);


const value = computed({
	get() {
	return props.userChoiceDoubleAuth // choix de l'utilisateur
	},
	set(value) {
	emit('update:modelValue', value)
	if (value == true) {
		open.value = true;
	}
	console.log(value)
	}
})


</script>
	
	
<style scoped>
.modal {
	border: solid;
	background-color: black;
	position: fixed;
	z-index: 999;
	top: 30%;
	left: 40%;
	width: 300px;
	margin-left: -150px;
}

</style>
