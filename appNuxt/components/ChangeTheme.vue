<script lang="ts">

  export default {
    name: 'ChangeTheme',

    methods: {
      setTheme(theme: string){
        document.documentElement.className = theme;
        }
    }

  };

</script>

<template >
  <div>
      <button @click="setTheme('green')" title="Light mode">
        THEME GREEN
      </button>
      <button @click="setTheme('blue')" title="Dark mode">
        THEME BLUE
      </button>
      <button @click="setTheme('yellow')" title="Dark mode">
        THEME YELLOW
      </button>
	</div>

</template> 
 