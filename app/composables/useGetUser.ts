import { User } from '../interfaces/user.interface';

export async function useGetUser() {
  const { $apiFetch } = useNuxtApp();

  const { data: user } = await useAsyncData<User>('logged-user', () => {
    return $apiFetch('/users/user/me');
  });

  return user;
}