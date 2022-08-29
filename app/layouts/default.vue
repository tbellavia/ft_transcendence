<template>
 <div class="real-body">
    <header>
      <headerNavbar/>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <footerCopyright style="top: 99%;"/>
    </footer>
</div>

</template>

<!-- -------------------------------------------------------------- -->

<style scoped>
.real-body {
  width: 100%;
  height: 100%;
}
</style>
