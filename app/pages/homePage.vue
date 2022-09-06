<template>
<nuxtLayout name="home">
	<userpageUserProfile />

      <!-- <v-tabs
        v-model="tab"
        background-color="primary"
        dark
      >
        <v-tab
          v-for="item in items"
          :key="item.tab"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(item, index) in items"
          :key="item.tab">
          <v-card flat v-if="tab == index">
            {{ tab }} {{ index }}

            <v-card-text>{{ item.content }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items> -->




	<!-- navbar in profile : title -->
		<v-tabs v-model="tab">
			<v-tab>MATCH HISTORY</v-tab>
			<v-tab>USER PARAMETERS</v-tab>
			<v-tab>FRIENDS</v-tab>
		</v-tabs>

	<!-- items of navbar profile -->
  <v-tab-items v-model="tab">
		<v-tab-item v-if="tab === 0"></v-tab-item>
    <v-tab-item v-if="tab === 1">
					<userpageUserParameters />
    </v-tab-item>
  	<v-tab-item v-if="tab === 2"></v-tab-item>
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