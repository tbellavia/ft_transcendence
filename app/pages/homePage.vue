<template>
<nuxtLayout name="home">
	<userpageUserProfile />
	<userpageUserParameters />
      <!-- <div v-html="svg.outerHTML"></div> -->
  </nuxtLayout>
</template>

<!-- <script setup>
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
</script> -->

