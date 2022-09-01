<template>
<div class="User-Parameters">
  
  <ul>USER PARAMETER
    <!-- <li> <userpageDoubleAuthenticationForm @DoubleAuthValidate="printOk"/> </li> -->
    <li> <userpageDoubleAuthentication /> </li>
  </ul>
</div>
</template>

<script setup lang="ts">

function printOk(){
  console.log('OK');
};

</script>
