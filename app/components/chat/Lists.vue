<template>
  <div id="chat" class="list-box">
    <div class="list-selectors">
      <button @click="listSelector = 'friends'"> Friends </button>
      <button @click="listSelector = 'all'"> Users </button>
      <button @click="listSelector = 'channels'">Channels</button>
    </div>
    <div class="list-chat-users">
      <Suspense v-if="listSelector == 'friends'">
        <userpageListFriends style="width: 100%"/>
      </Suspense>
      <Suspense v-else-if="listSelector == 'all'">
        <userpageListUsers style="width: 100%"/>
      </Suspense>
      <Suspense v-else-if="listSelector == 'channels'">
        <ChatChannelList style="width: 100%" />
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
let listSelector = ref('friends');
</script>

<style>

  .list-chat-users {
    display: flex;
	width: 100%;
	height: 100%;
	padding-top: 10%;
	padding-bottom: 10%;
  height: 95%;
	overflow: scroll;

  }
  .list-box {
    border: 0.2rem solid var(--main-color-darker);
    min-width: 15%;
    max-width: 20%;

    font-size: 14px;
  }

  .list-selectors {
    display: flex;
    justify-content: space-around;

    background-color: var(--background-line-color);
  }

  .list-selectors button {
    width: 100%;
  }
  
</style>