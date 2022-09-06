<template>
 <div class="real-body">
    <header>
      <headerNavbar/>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <footerCopyright style="top: 98%;"/>
    </footer>
</div>

</template>

<!-- -------------------------------------------------------------- -->

<style scoped>
  .real-body {
    width: 100%;
    height: 100%;
  }
  
   /* Visual monitor */
  /* position static ? TODO a verifier pour que la barre de navigation reste fixe */
  header {
    width: 100%;
    position: static;
    background-image: radial-gradient(
      var(--grey-color-lighter),
      var(--background-color)
    );
  }
  
  /* Global style for all component with animation pulse for blink letters */
  main {
    background-image: radial-gradient(
      var(--grey-color-lighter),
      var(--grey-color-dark)
    );
  
    box-shadow: 0 0 10vmin 2vmin var(--background-color) inset;
    height: 90%;
    width: 100%;
  
    /* TODO check*/
    position: fixed;
  
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
  }
  </style>