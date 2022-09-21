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
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 100%;
  }

  .page {
    flex: 2 1;

    width: 100%;
    height: 100%;
  }

  .chat-list {
    flex: 1 2;

    max-width: 20%;
    min-width: 10%;
  }

  .chat-box {
    margin: 2rem;
  }
</style>