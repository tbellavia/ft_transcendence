
<template>
	<div class="form">
		<input v-model="model" placeholder="enter key">
		<v-space></v-space>
		<button @click="checkKey"> validate </button>
	</div>
</template>

<script setup lang="ts">
  let allowSpaces = ref( false);
  let match = ref('coucou');
  let max = ref(6);
  let model = ref('');

  const emit = defineEmits({
  DoubleAuthValidate: null,
})

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

<style scoped>

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
