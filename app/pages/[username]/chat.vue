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
    flex-grow: 2;
  }
  .chat-target-page {
    flex-grow: 2;

    width: 100%;
    height: 100%;
  }

  .chat-box {
    margin: 2rem;
  }
</style>