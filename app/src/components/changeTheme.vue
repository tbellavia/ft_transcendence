<script setup lang="ts">
  const setTheme = theme => document.documentElement.className = theme;

</script>


<template>
  <div>
      <button onclick="setTheme('blue')" title="Light mode">
        THEME GREEN
      </button>
      <button onclick="setTheme('blue')" title="Dark mode">
        THEME BLUE
      </button>
	</div>
</template>
