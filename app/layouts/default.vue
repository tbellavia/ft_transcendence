<template>
 <div class="real-body">
    <headerNavbar/>
    <slot />
    <footerCopyright style="top: 99%;"/>
</div>

</template>


<!-- -------------------------------------------------------------- -->

<style scoped>
.real-body {
  width: 100%;
  height: 100%;
}
</style>
