<!-- <template>
<v-app id="inspire">
    <v-container>
      <v-row
  
        justify="space-between"
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-form ref="form">
            <v-text-field
              v-model="model"
              :counter="max"
              :rules="rules"
              label="First name"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template> -->

<template>
	<input class=input :v-model="model" placeholder="enter key">
		<button @click="checkKey"> validate </button>
		<p> {{ model }}</p>
</template>

<script setup lang="ts">
  let allowSpaces = ref( false);
  let match = ref('coucou');
  let max = ref(6);
  let model = ref();

  const emit = defineEmits({
  // Define connect event for notify the page
  // No validation checking for emit
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
// function rules () {
// 	const rules = []

// 	if (this.max) {
// 		const rule =
// 			v => (v || '').length <= this.max ||
// 			`A maximum of ${this.max} characters is allowed`

// 		rules.push(rule)
// 	}

//     if (!this.allowSpaces) {
// 	const rule =
// 		v => (v || '').indexOf(' ') < 0 ||
// 		'No spaces are allowed'

// 	rules.push(rule)
// 	}

// 	if (this.match) {
// 	const rule =
// 		v => (!!v && v) === this.match ||
// 		'Values do not match'

// 	rules.push(rule)
// 	}

// 	return rules
// }

//   watch([match: 'validateField',
//     max: 'validateField',
//     model: 'validateField') => {
// 		this.$refs.form.validate()
//     },
// 	}
//   },

//   methods: {
//     validateField () {
//       this.$refs.form.validate()
//     },
//   },
// })


</script>
