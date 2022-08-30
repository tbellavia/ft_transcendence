<template>
<div class="User-Parameters">
  USER PARAMETER
  <p> Double Authentication : 
  <label class="switch">
      <input type="checkbox" id="DoubleAuth" autocomplete="on">
      <span class="slider round"></span>
  </label>
  <!-- https://vuejs.org/guide/components/events.html#usage-with-v-model -->
  <label class="switch">
      <input type="checkbox" id="DoubleAuth" autocomplete="on">
      <span class="slider round"></span>
  </label>
  </p>
</div>
</template>


<script setup lang="ts">

  let checkboxDoubleAuth = ref(document.querySelector('input[id="DoubleAuth"]') as HTMLInputElement | null);

  if (checkboxDoubleAuth) {
    checkboxDoubleAuth.checked = true;

    checkboxDoubleAuth.addEventListener

    console.log(checkboxDoubleAuth);
    checkboxDoubleAuth.onchange = function() {
      if (checkboxDoubleAuth.checked) {
        console.log("CHECKED");
      }
      else {
        console.log("UN checked");
      }
    }
}

</script>


<style scoped>

  .User-Parameters {

  }

  
  .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--main-color-op-10);
  -webkit-transition: .3s;
  transition: .3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  border: solid;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--main-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px (var(--background-color));
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
