<template>
  <li class="dropleft">
    <svgLogoParam />
    <ul>
      <li><a href="#" @click="disconnect">disconnect</a></li>
    </ul>
  </li>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
const emit = defineEmits(["disconnect"]);

async function disconnect() {
  const { $apiFetch } = useNuxtApp();
  await $apiFetch("/auth/disconnect").then(() => emit("disconnect"));
}
</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
button {
  text-align: left;
  font-size: 14px;
  width: 100px;
}

li.dropleft {
  position: relative;
}

li.dropleft ul {
  display: none;
}

li.dropleft li {
  border-left: solid;
}

li.dropleft:hover ul {
  position: absolute;
  display: flex;
  flex-direction: column;
  /* top: -50%; */
  right: 100%;
  z-index: 500;
  overflow: visible;
}
</style>
