<template>
  <div class="dialog">
    <ChatDisplay :target="target" :isChannel="isChannel" />
    <ChatSend :target="target" :isChannel="isChannel" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  target: {
    type: String,
    required: true    
  },
  isChannel: Boolean
});
</script>