<template>
  <li class="dropleft">
    <svgLogoColorSwatch />
    <ul>
      <li v-for="color in colors">
        <button @click="setTheme(color)"> {{ color }}</button>
      </li>
    </ul>
  </li>
</template>

<!-- -------------------------------------------------------------- -->

<script setup lang="ts">
  let colors = ref(["GREEN", "BLUE", "YELLOW"]);
  function setTheme(theme: string) {
    document.documentElement.className = theme.toLowerCase();
  }
</script>

<!-- -------------------------------------------------------------- -->

<style scoped>
</style>
