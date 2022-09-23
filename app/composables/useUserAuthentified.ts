import { UserAuthentified } from '~~/classes/UserAuthentified.class'
import { UserInfos } from '~~/classes/User.class';

const { $apiFetch } = useNuxtApp();

async function getUserAuthentifiedInfos() {
  const userAuthentifiedInfos: UserInfos = await $apiFetch('/user/user/me');
  return userAuthentifiedInfos;
}

export async function useUserAuthentified() {
  const { username } = await getUserAuthentifiedInfos();
  return useState(username, () => new UserAuthentified(username, $apiFetch));
}