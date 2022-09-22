<template>
  <div class="chat-page">
    <ChatLists class="chat-list" />
    <div class="chat-target-page">
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

  .chat-list {
    width: 15%;
    min-width: max-content;
  }
  .chat-target-page {
    width: 85%;
    height: 100%;
  }

  .chat-box {
    margin: 2rem;
  }
</style>