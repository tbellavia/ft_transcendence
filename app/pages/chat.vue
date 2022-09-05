<template>
  <h1>Chat</h1>
</template>

<script lang="ts" setup>
import { io } from "socket.io-client";

const socket = io('http://localhost:3000/chat', {
  withCredentials: true
});
</script>