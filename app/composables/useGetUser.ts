import { User } from '../interfaces/user.interface';

export async function useGetUser() {
  const { $apiFetch } = useNuxtApp();

  try {
    const { data: user } = await useAsyncData<User>('logged-user', () => {
      return $apiFetch('/users/user/me')
        .catch(error => {
          return {};
        })
    });
    return user;
  } catch(error) {
    return undefined;
  }
}