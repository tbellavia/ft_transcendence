<template>
    <div class="friends-options">
        <!-- PENDING FRIENDS: accept or refuse friendship -->
        <div v-show="!isBlocked" v-if="pendingFriend === true">
            <button class="OptionsProfile_sub" @click="useAction('acceptFriend')"> accept friend
            </button>
            <button class="OptionsProfile_sub" @click="useAction('removeFriend')"> refuse friend
            </button>
        </div>
        <!-- ADD or REMOVE FRIENDSHIP -->
        <button v-show="!isBlocked" v-else-if="isFriend === false" class="OptionsProfile_sub"
            @click="useAction('addFriend')"> add friend
        </button>
        <button v-show="!isBlocked" v-else-if="isFriend === true" class="OptionsProfile_sub"
            @click="useAction('removeFriend')"> remove friend
        </button>
        <!-- SEND MESSAGE -->
        <div v-show="!isBlocked" class="OptionsProfile_sub">
            <NuxtLink class="button" :href="messageLink">message </NuxtLink>
        </div>
        <!-- SUGGEST MATCH -->
        <button v-show="!isBlocked" class="OptionsProfile_sub"> suggest a match </button>
        <button v-if="isBlocked" class="OptionsProfile_sub" @click="useAction('unblock')"> unblock
        </button>
        <button v-else class="OptionsProfile_sub" @click="useAction('block')"> block
        </button>
    </div>
</template>


<script setup lang="ts">
const props = defineProps({
    username: String
})

const user = await(useUser(props.username))

let userAuthenticate = await getRefreshedUserAuthenticate();
const messageLink = `/${userAuthenticate.value.username}/chat/${props.username}`;
const isBlocked = ref(await userAuthenticate.value.isBlockUser(user.value));
const isFriend = ref(await userAuthenticate.value.isFriend(user.value.username));
const pendingFriends = ref(await userAuthenticate.value.getFriendsRequest());
const pendingFriend = ref(false)

for (let pending of pendingFriends.value) {
    if (pending.user_1.username === props.username) {
        pendingFriend.value = true;
        break
    }
}

async function useAction(action: string) {
    try {
        if (action === 'acceptFriend')
            await userAuthenticate.value.acceptFriend(user.value);
        else if (action === 'addFriend')
            await userAuthenticate.value.addFriend(user.value);
        else if (action === 'removeFriend')
            await userAuthenticate.value.deleteFriend(user.value);
        else if (action === 'block') {
            await userAuthenticate.value.blockUser(user.value);
            isBlocked.value = await userAuthenticate.value.isBlockUser(user.value);
        }
        else if (action === 'unblock') {
            await userAuthenticate.value.unblockUser(user.value);
            isBlocked.value = await userAuthenticate.value.isBlockUser(user.value);
        }
    }
    catch { }
    userAuthenticate = await getRefreshedUserAuthenticate();
    isFriend.value = await userAuthenticate.value.isFriend(user.value.username);
    pendingFriends.value = await userAuthenticate.value.getFriendsRequest();

    pendingFriend.value = false;
    for (let pending of pendingFriends?.value) {
        if (pending.user_1.username === props.username) {
            pendingFriend.value = true;
            break
        }
    }
}
</script>

<style scoped>

button {
    width: 20vw;
} .button {
    width: 20vw;
}
</style>