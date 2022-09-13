<template>
  <div class="chat-page">
    <ChatLists class="chat-lists" />
    <div class="page">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>

  .chat-page {
    border: solid brown;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .page {
    border: solid yellow;
    width: 100%;
    height: 100%;
  }

  .chat-list {
    max-width: 20%;
    min-width: 10%;
    display: flex;
  }

  .chat-box {
    margin: 2rem;
  }
</style>