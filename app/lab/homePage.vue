<template>

</template>

<script setup lang="ts">

let tab = ref(null);

let items = ref([
        { tab: 'One', content: 'Tab 1 Content' },
        { tab: 'Two', content: 'Tab 2 Content' },
        { tab: 'Three', content: 'Tab 3 Content' },
        { tab: 'Four', content: 'Tab 4 Content' },
      ])
  const temp = document.createElement('temporary');
  temp.innerHTML = qrCode.trim();
  const svg = temp.firstChild;

  for (let i = 0; i < svg.children.length; ++i) {
    svg.children[i].setAttribute('stroke', 'currentColor');
    svg.children[i].setAttribute('fill', 'none');
  }
</script>

<style>
.home-page {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: space-around;
  top: 1%;
}

.all-users {
  display: flex;
}

.self-profile {
  display: flex;
}

.chat {
  width: 28%;
  border: solid;
  border-color: red;
}
</style>
