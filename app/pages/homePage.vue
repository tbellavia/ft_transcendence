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
</template>

<script setup lang="ts">

let tab = ref(null);

let items = ref([
        { tab: 'One', content: 'Tab 1 Content' },
        { tab: 'Two', content: 'Tab 2 Content' },
        { tab: 'Three', content: 'Tab 3 Content' },
        { tab: 'Four', content: 'Tab 4 Content' },
      ])
</script>