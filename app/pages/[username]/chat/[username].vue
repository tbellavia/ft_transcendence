<template>
  <ChatDialog :target="username" :isChannel="isChannel"></ChatDialog>
</template>

<script setup lang="ts">
  const route = useRoute();
  let username = ref('');
  let isChannel = ref(false);

  username.value = String(route.params.username);
  console.log('Route query:',route.query);
  if (route.query?.isChannel)
    isChannel.value = true;
</script>