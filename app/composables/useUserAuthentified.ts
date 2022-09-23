import { UserAuthentified } from '~~/classes/UserAuthentified.class'
import { UserInfos } from '~~/classes/User.class';
import { Ref } from 'vue';

const { $apiFetch } = useNuxtApp();

async function getUserAuthentifiedInfos() {
  const userAuthentifiedInfos: UserInfos = await $apiFetch('/user/user/me');
  return userAuthentifiedInfos;
}

export async function useUserAuthentified(): Promise<Ref<UserAuthentified>> {
  const { username } = await getUserAuthentifiedInfos();
  return useState(username, () => new UserAuthentified(username, $apiFetch));
}