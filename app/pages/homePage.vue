<template>
<nuxtLayout name="home">
	<userpageUserProfile />

	<!-- navbar in profile : title -->
		<v-tabs v-model="tab">
			<v-tab>MATCH HISTORY</v-tab>
			<v-tab>FRIENDS</v-tab>
			<v-tab>USER PARAMETERS</v-tab>
		</v-tabs>

	<!-- items of navbar profile -->
  <v-tab-items v-model="tab">
		<v-tab-item v-if="tab === 0"></v-tab-item> 
    <v-tab-item v-if="tab === 1">
      <userpageUserList />
    </v-tab-item>
  	<v-tab-item v-if="tab === 2">
      <userpageUserParameters />
    </v-tab-item>
	</v-tab-items>
</nuxtLayout>
	<!-- <nuxtLayout name="home">
      <div v-html="svg.outerHTML"></div>
  </nuxtLayout> -->
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
