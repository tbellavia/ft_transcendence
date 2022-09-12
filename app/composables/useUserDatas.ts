interface UserDatas {
  username: string;
  two_factor_auth_secret?: string;
  is_two_factor_auth_enabled: boolean;
  creation_data: Date;
}

export async function useUserDatas() {
  return await useState('userDatas', async () => {
    const { data } = await useApiFetch<UserDatas>('/users/user/me');
    return data;
  }).value;
}
