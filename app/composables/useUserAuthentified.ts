import { UserAuthentified } from '~~/classes/UserAuthentified.class'
import { UserInfos } from '~~/classes/User.class';
import { Ref } from 'vue';

let userAuthenticate: Ref<UserAuthentified> = ref(undefined);

// fetch userAuthenticate and return it in class
export async function useUserAuthentified(): Promise<Ref<UserAuthentified>> {
  const { $apiFetch } = useNuxtApp();
  const { username } = await getUserAuthentifiedInfos();
  
  userAuthenticate.value = new UserAuthentified(username, $apiFetch);
  await userAuthenticate.value.fetchAll();
  return userAuthenticate;
}


// get userAuthenticate reference
export function getUserAuthenticate() {
  return userAuthenticate;
}

// refresh and get refreshed userAuthenticate
export async function getRefreshedUserAuthenticate() {
  await useUserAuthentified();
  return userAuthenticate;
}


async function getUserAuthentifiedInfos() {
  const { $apiFetch } = useNuxtApp();
  const userAuthentifiedInfos: UserInfos = await $apiFetch('/users/user/me');
  return userAuthentifiedInfos;
}