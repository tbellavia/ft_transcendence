<template>
  <div class="chat-page">
    <ChatDialog class="chat-box" target="bbellavi"/>
    <ChatDialog class="chat-box" target="lperson-"/>
  </div>
</template>

<style scoped>
  .chat-page {
    display: flex;
    justify-content: space-evenly;
  }

  .chat-box {
    margin: 2rem;
  }
</style>