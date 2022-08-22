<template>
  <li class="dropleft">
    <SVGLogoColorSwatch />
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
  top: -50%; 
	right: 100%;
	z-index: 500;
	overflow: visible;
}

</style>
