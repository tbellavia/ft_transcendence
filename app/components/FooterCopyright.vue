<template>
  <div class="copyrights">
    <div>
      > 42 Project Transcendence made by
      <a target="_blank" href="https://github.com/Cardiox12" >bbellavi</a>,
      <a target="_blank" href="https://github.com/Lylian-Nail">lperson-</a>,
      <a target="_blank" href="https://github.com/fullife32">eassouli</a>,
      <a target="_blank" href="https://github.com/lvirgini">lvirgini</a>&nbsp;<span class="blink">&nbsp;</span>
    </div>
  </div>
</template>

<!-- -------------------------------------------------------------- -->

<style scoped>
/* stylelint-disable */

div.copyrights {
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 12px;
  opacity: 0.9;
  overflow: hidden;
}

span.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    background-color: var(--main-color-dark);
  }
}
</style>
