import { UserAuthentified } from '~~/classes/UserAuthentified.class'
import { UserInfos } from '~~/classes/User.class';
import { Ref } from 'vue';

let userAuthenticate: ref<UserAuthentified> = undefined;

export function getUserAuthenticate() {
  return userAuthenticate;
}

export async function getRefreshedUserAuthenticate() {
  await useUserAuthentified();

  // if (userAuthenticate === undefined)
  //   await useUserAuthentified();
  // else
  //   await userAuthenticate.value.fetchAll()
  return userAuthenticate;
}

async function getUserAuthentifiedInfos() {
  const { $apiFetch } = useNuxtApp();
  const userAuthentifiedInfos: UserInfos = await $apiFetch('/users/user/me');
  return userAuthentifiedInfos;
}

export async function useUserAuthentified(): Promise<Ref<UserAuthentified>> {
  const { $apiFetch } = useNuxtApp();
  const { username } = await getUserAuthentifiedInfos();
  
  userAuthenticate = await useState(username, () => new UserAuthentified(username, $apiFetch));
  await userAuthenticate.value.fetchAll();
  console.log("USE USER AUTH: ", userAuthenticate.value);

  return userAuthenticate;
}