<script lang="ts">
import LogoColorSwatch from "./Svg/logo-color-swatch.vue";

  export default {
    name: "ChangeTheme",
    methods: {
        setTheme(theme: string) {
            document.documentElement.className = theme.toLowerCase();
        },

    },
    data() {
        return {
            "colors": [
              "GREEN", "BLUE", "YELLOW"]
        };
    },
    components: { LogoColorSwatch }
}

</script>

<template>

     <li class="dropdown"> <LogoColorSwatch class="dropdown-menu"/> 
        <ul>
          <li class="dropydown-item" v-for="color in colors" >
            <button @click="setTheme(color)"> {{ color }} </button> </li>
        </ul>
    </li> 


</template>

<style scoped >
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
