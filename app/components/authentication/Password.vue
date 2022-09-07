<!-- Please remove this file from your project -->
<template>
  <div>
    <form action="#" @submit.prevent="authenticateApi">
      <fieldset>
        <label>
          <input
            type="text"
            required
            v-model="username"
            placeholder="username"
            name="username" />
        </label>
        <label>
          <input
            type="password"
            required
            v-model="password"
            placeholder="password"
            name="password"
            minlength="8" />
        </label>
        <div class="form-btns">
          <input type="submit" value="connect" @click="isRegistering = false" />
          <input type="submit" value="register" @click="isRegistering = true" />
        </div>
      </fieldset>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

const isRegistering: Ref<boolean> = ref(false);
const password: Ref<string> = ref('');
const username: Ref<string> = ref('');

const errorMessage: Ref<string> = ref('');

async function authenticateApi() {
  const { $apiFetch } = useNuxtApp();
  const apiRoute = isRegistering.value ? '/auth/register' : '/auth/connect';

  try {
    const user = await $apiFetch(apiRoute, {
      method: 'POST',
      body: {
        password: password.value,
        username: username.value
      }
    });
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = error.data.message;
  }
}

</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
  form {
    display: table;
  }

  input,
  fieldset {
    color: var(--main-color);
    border: solid var(--main-color-dark);
    border-collapse: collapse;
  }

  fieldset {
    margin: 0 auto;
  }

  label {
    display: block;
    margin: 1rem;
  }

  input::placeholder {
    color: var(--main-color);
  }

  input[type="submit"] {
    border-bottom: none;
  }

  .form-btns {
    display: flex;
    flex-direction: row;

    justify-content: space-evenly;
  }
</style>
