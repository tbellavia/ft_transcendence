<template>
	<nuxtLayout name="home">
      <div style="width: 35%; border: solid; border-color: orange; color: var(--main-color-light)">
        <div v-html="svg.outerHTML"></div>
        <!-- <div v-html="temp.innerHTML"></div> -->
      </div>
  </nuxtLayout>
</template>

<script setup>
  const { $apiFetch } = useNuxtApp();

  const qrCode = await $apiFetch('/2fa/generate', {
    method: 'POST'
  });

  const temp = document.createElement('temporary');
  temp.innerHTML = qrCode.trim();
  const svg = temp.firstChild;

  for (let i = 0; i < svg.children.length; ++i) {
    svg.children[i].setAttribute('stroke', 'currentColor');
    svg.children[i].setAttribute('fill', 'none');
  }
  console.log(svg);
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
