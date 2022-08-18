<template>
  <nav class="navigation-line">
    <li id="drop" class="drop-1">
      <div id="menu" class="drop-1-menu">PREMIER</div>
      <ul>
        <li class="drop-item-1" v-for="aliment in aliments">
          <button class="button-1">{{ aliment }}</button>
        </li>
      </ul>
    </li>
    <li id="drop" class="drop-2">
      <div id="menu" class="drop-2-menu">DEUXIEME</div>
      <ul>
        <li class="drop-item-2" v-for="aliment in aliments">
          <button class="button-2">{{ aliment }}</button>
        </li>
      </ul>
    </li>
    <li id="drop" class="drop-3">
      <div id="menu" class="drop-3-menu">TROISIEME</div>
      <ul>
        <li class="drop-item-3" v-for="aliment in aliments">
          <button class="button-3">{{ aliment }}</button>
        </li>
      </ul>
    </li>
    <li id="drop" class="drop-4">
      <div id="menu" class="drop-4-menu">TROISIEME</div>
      <ul>
        <li class="drop-item-3" v-for="aliment in aliments">
          <button class="button-3">{{ aliment }}</button>
        </li>
      </ul>
    </li>
  </nav>
</template>

<script>
/* Nuxt 2 vue option API
    export default {
        name: 'testing_css',

        data() {
            return {
                'aliments': ['banane', 'chocolat', 'pasteque', 'caramel'],
            }
        }
    }
*/
</script>

<script setup lang="ts">
let aliments = ref(["banane", "chocolat", "pasteque", "caramel"]);
</script>

<style scoped>
/* base of list */
/* stylelint-disable */

.navigation-line {
  width: 100%;
  height: 30px;
  display: flex;
}

li#drop {
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  flex-basis: 120px;
  justify-content: center;
}

li#drop div {
  border: solid;
  border-color: transparent;
}

li#drop ul {
  display: none;
}

li#drop:hover ul {
  display: flex;
  flex-direction: column;
  position: absolute;
  border: solid;
  border-color: transparent;
  top: 100%;
}

li#drop li {
  border: solid;
  border-color: transparent;
  display: flex;
  justify-content: flex-start;
  width: 120px;
}

button {
  border: solid;
  border-color: transparent;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-left: 10%;
}

/* PREMIER */

.drop-1:hover {
  background-color: var(--main-color-light);
  color: var(--background-color);
}

.drop-1 li {
  background-color: var(--main-color-op-10);
  color: var(--main-color-light);
}

.drop-1 li:hover {
  color: var(--main-color-light);
  background-color: var(--main-color-op-30);
}

/* DEUXIEME */

.drop-2,
.drop-3,
.drop-4 {
  border-bottom: solid;
}

.drop-2:hover,
.drop-3:hover,
.drop-4:hover {
  border-left: solid;
  border-top: solid;
  border-right: solid;
  border-bottom: solid;
  border-bottom-color: transparent;
}

.drop-2 li {
  background-color: var(--main-color-op-10);
}

.drop-2 li:hover button {
  border-left: solid;
  border-left-color: var(--main-color-light);
  color: var(--main-color-light);
}

/* TROISIEME */

.drop-3 li {
  background-color: var(--main-color-op-10);
  color: var(--main-color-light);
}

.drop-3 li:hover button {
  color: var(--main-color-light);
  border: solid;
}

/* QUATRIEME */

.drop-4 li {
  background-color: var(--main-color-op-10);
  color: var(--main-color-light);
}

.drop-4 li:hover button {
  background-color: var(--main-color);
  color: var(--background-color);
}
</style>
