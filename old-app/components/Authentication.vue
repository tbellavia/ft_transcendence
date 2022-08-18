<!-- Please remove this file from your project -->
<template>
  <div class="authentication-link">
    <p class="authentication-item">Click for login with 42</p>
    <a class="authentication-item" href="#"><Boy style="width: 100%" /></a>
  </div>
</template>

<script setup lang="ts">
function isAuthenticate() {
  return true;
}
</script>

<style scoped>
/* stylelint-disable */

.authentication-link {
  position: absolute;
  width: 280px;
  height: 310px;
  top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.authentication-link:hover {
  border: solid;
}

.authentication-item {
  display: flex;
  justify-self: center;
  flex-shrink: auto;
  background-color: transparent;
  width: 100%;
}

.authentication-item div.img-svg {
  width: 100%;
}

.authentication-link p {
  width: 100%;
  border: solid;
  padding-left: 18px;
}

.authentication-link:hover p {
  border: none;
}
</style>
<!-- <div>
    <a class="authentication-link" href="#">
      <p class="authentication-item"> Click for login with 42 </p>
      <Boy class="authentication-item" style="width: 80%;"/>
    </a>
  </div> -->
