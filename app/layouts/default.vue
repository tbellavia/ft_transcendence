<template>
 <div class="real-body">
    <header>
      <NavBar/>
    </header>
    <main>
      <slot />
    </main>
    <Copyright style="top: 99%;"/>
</div>

</template>


<!-- -------------------------------------------------------------- -->

<style scoped>
.real-body {
  width: 100%;
  height: 100%;
}
</style>
