<script setup lang="ts">
import ChangeTheme from '@/components/changeTheme.vue'
import AuthenticationPage from '@/view/AuthenticationPage.vue'

//init theme: a refaire car reactualise la couleur au refresh 
if (!document.documentElement.className)
  document.documentElement.className = 'blue';

// setTheme("green");

</script>

<template>
  <header>
    <ChangeTheme />

  </header>

  <main>
    <AuthenticationPage />
  </main>
</template>
