
<template>
	<div class="form">
		<form  method="get" class="digit-group" data-group-name="digits" data-autosubmit="false">
			<input v-model="input[0]" maxlength="1" @keyup="clickEvent('0', '1', $event)" class="inputOtp" type="text" id="0" placeholder="-" />
			<input v-model="input[1]" maxlength="1" @keyup="clickEvent('1', '2', $event)" class="inputOtp" type="text" id="1" placeholder="-" />
			<input v-model="input[2]" maxlength="1" @keyup="clickEvent('2', '3', $event)" class="inputOtp" type="text" id="2" placeholder="-" />
			<input v-model="input[3]" maxlength="1" @keyup="clickEvent('3', '4', $event)" class="inputOtp" type="text" id="3" placeholder="-" />
			<input v-model="input[4]" maxlength="1" @keyup="clickEvent('4', '5', $event)" class="inputOtp" type="text" id="4" placeholder="-" />
			<input v-model="input[5]" maxlength="1" @keyup="clickEvent('5', '', $event)" class="inputOtp" type="text" id="5" placeholder="-" />
		</form>
		<v-space></v-space>
		<button @click="checkKey"> validate </button>
	</div>
</template>

<script setup lang="ts">
let input = ref([]);

function clickEvent(current_id: string, next_id: string, event) {
	
	// event.key we don't want to pass to another input
	if (event.key === "Shift" || event.key === "Tab" || event.key === "Backspace") {
		// if backspace and actual input empty return to before input
		if (event.key === "Backspace" && !input.value[Number(current_id)]) {
			if (current_id !== '0')
			document.getElementById((Number(current_id) - 1).toString()).focus();
		}
		return;
	}
	else if (event.key === "Enter")
		checkKey();
	// pass to next_id input only if input is a number else reset value
	else if ( (event.keyCode >= 97 && event.keyCode <= 105) 
	|| (event.keyCode >= 48 && event.keyCode <= 57) 
	&& next_id) {
		document.getElementById(next_id).focus();
	}
	else
		input.value[Number(current_id)] = '';
}


const emit = defineEmits({
DoubleAuthValidate: null,
})

function checkKey() {
	// LYLIAN: YOU CAN CHOOSE string or numbers:
	// join() make a string of all number
	console.log(input.value.join(''));

	// you can Number(input.value.join(''))
	console.log(Number(input.value.join('')));

	if (input.value.join() === "123456")
		emit("DoubleAuthValidate")
	else {
		// clean input and focus to first element input
		input.value = [];
		document.getElementById('0').focus();
	}
}
</script>

<style scoped>
.digit-group input {
	width: 30px;
	height: 40px;
	border: solid;
	line-height: 50px;
	text-align: center;
	font-size: 24px;
	font-weight: 200;
	margin: 0 2px;
}

.form {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
}
.form * {
	display: flex;
	align-self: center;
}
</style>


