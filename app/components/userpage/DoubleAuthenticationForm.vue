
<template>
	<div class="form">
		<form method="get" class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
			<input onkeyup="nextInput(2)" class="inputOtp" type="text" id="digit-1" name="digit-1" data-next="digit-2" placeholder="-" />
			<input onkeyup="nextInput(3)" class="inputOtp" type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" placeholder="-" />
			<input onkeyup="nextInput(4)" class="inputOtp" type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" placeholder="-" />
			<input onkeyup="nextInput(5)" class="inputOtp" type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" placeholder="-" />
			<input onkeyup="nextInput(6)" class="inputOtp" type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" placeholder="-" />
			<input class="inputOtp" type="text" id="digit-6" name="digit-6" data-previous="digit-5" placeholder="-" />
		</form>
		<v-space></v-space>
		<button @click="checkKey"> validate </button>
	</div>
</template>

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

	.splitter {
		padding: 0 5px;
		color: white;
		font-size: 24px;
	}

.prompt {
	margin-bottom: 20px;
	font-size: 20px;
	color: white;
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
<script setup lang="ts">
  let allowSpaces = ref( false);
  let match = ref('coucou');
  let max = ref(6);
  let model = ref('');

  const emit = defineEmits({
  DoubleAuthValidate: null,
})

function nextInput(number: string) {
	
}

//   watch(model,(newModel) => {
// 	console.log(model);
// 	if (model == '123456')
// 		emit("DoubleAuthValidate")
// 	else {
// 		model.value = 0;
// 		// tell some error
// 	}
// })

function checkKey() {
	console.log(model.value);
	if (model.value)
		emit("DoubleAuthValidate")
	else {
		model.value = "";
		// tell some error
	}
}

function DoubleAuthenticationFormRules() {
	const rules = []
	if (this.max) {
		const rule =
			v => (v || '').length <= this.max ||
			`A maximum of ${this.max} characters is allowed`

		rules.push(rule)
	}
	return rules
}

</script>

