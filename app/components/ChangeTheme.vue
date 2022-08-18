<template>
  <li class="dropdown">
    <SVGLogoColorSwatch class="dropdown-menu" />
    <ul>
      <li class="dropydown-item" v-for="color in colors">
        <button @click="setTheme(color)">{{ color }}</button>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
let colors = ref(["GREEN", "BLUE", "YELLOW"]);
function setTheme(theme: string) {
  document.documentElement.className = theme.toLowerCase();
}
</script>

<style scoped>
button {
  font-size: 12px;
  width: 130px;
}
/* stylelint-disable */

button:hover {
  background-color: var(--main-color);
  color: var(--background-color);
}
</style>
