<template>
  <article class="user-card">
    <img :src="avatarUrl" alt="user's avatar" />
    <div class="user-content">
      <header>
        <h3>{{ name }}</h3>
      </header>

      <main>
        <fieldset>
          <button type="button">Invite to game</button>
          <button v-if="isModerator" type="button">Ban user</button>
          <button v-if="isModerator" type="button">Mute user</button>
        </fieldset>
      </main>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    required: true,
    type: String
  },
  isModerator: Boolean
});

const user = await useUserApi(props.name);
const avatarUrl = await user.getAvatar();

</script>

<style scoped>

.user-card {
  display: flex;
}

.user-content {
  display: flex;
  flex-direction: column;

  flex: 1;
}

.user-content > main {
  margin: 2em 0;
}

</style>