import { UserAuthentified } from '~~/classes/UserAuthentified.class'
import { UserInfos } from '~~/classes/User.class';
import { Ref } from 'vue';


async function getUserAuthentifiedInfos() {
  const { $apiFetch } = useNuxtApp();
  const userAuthentifiedInfos: UserInfos = await $apiFetch('/user/user/me');
  return userAuthentifiedInfos;
}

export async function useUserAuthentified(): Promise<Ref<UserAuthentified>> {
  const { $apiFetch } = useNuxtApp();
  const { username } = await getUserAuthentifiedInfos();
  const user = useState(username, () => new UserAuthentified(username, $apiFetch));
  await user.value.fetchAll();
  return user;
}